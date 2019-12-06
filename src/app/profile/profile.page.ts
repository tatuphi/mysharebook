import { Component, OnInit } from '@angular/core';
import { AuthclientService } from '../authclient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authClientService: AuthclientService) { }

  ngOnInit() {
    this.authClientService.getToken();
  }

}
