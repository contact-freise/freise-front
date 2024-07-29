import { Component } from '@angular/core';
import { appImports } from '../../app.config';
import { OnInit } from '@angular/core';
// var giphy = require('giphy-api')();

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: true,
  imports: appImports,
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*debugger
    giphy('0UTRbFtkMxAplrohufYco5IY74U8hOes').random('sad hamster', function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res.data.image_url);
        document.getElementById('giphy').setAttribute('src', res.data.image_url);
      }
    });*/
  }

}
