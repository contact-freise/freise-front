import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_IMPORTS } from '../../app.config';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ...APP_IMPORTS || [],
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  maxDate: Date;

  googlePlacesOptions = {
    types: ['(cities)'],
  };
  autocompleteService = new google.maps.places.AutocompleteService();

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    private _activityService: ActivityService
  ) {
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      gender: ['', Validators.required],
      location: ['', Validators.required, this.validateLocation],
      dob: ['', [Validators.required, this.validateAdult]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  validateLocation = async (control: AbstractControl) => {
    const location = control.value;
    return this.valiadateLocation(location)
  };

  private async valiadateLocation(location: string) {
    if (!location) {
      return { invalidCity: true };
    }
    try {
      const predictions = await this.getPlacePredictions(location);
      if (predictions?.length > 0) {
        return null;
      } else {
        return { invalidCity: true };
      }
    } catch (error) {
      console.error('Error validating location:', error);
      return { invalidCity: true };
    }
  }


  private getPlacePredictions(input: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions(
        { input, types: ['(cities)'] },
        (predictions: any[], status: string) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(predictions);
          } else {
            reject(status);
          }
        }
      );
    });
  }

  validateAdult(control: AbstractControl): { [key: string]: boolean } | null {
    const dob = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const isBeforeBirthday =
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());

    return age > 18 || (age === 18 && !isBeforeBirthday) ? null : { minor: true };
  }

  handleAddressChange(place: google.maps.places.PlaceResult): void {
    const city = place.address_components?.find((component) =>
      component.types.includes('locality')
    )?.long_name;

    if (city) {
      this.registerForm.get('location')?.setValue(city);
    } else {
      this.registerForm.get('location')?.setErrors({ invalidCity: true });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const predictions = await this.getPlacePredictions(this.registerForm.value.location)
      const user = this.registerForm.value;
      this._authService.register({
        ...user,
        location: predictions[0]?.description,
      }).subscribe(
        (res) => {
          this._authService.initUser(res);
          this._activityService.log({
            type: 'register',
          });
          this._router.navigate(['/home']);
        },
        (err) => {
          this._toastr.error(err.error.message);
        }
      );
    }
  }
}
