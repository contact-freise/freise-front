import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

const loadGoogleMapsApi = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
loadGoogleMapsApi();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);