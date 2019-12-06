import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import * as bcrypt from 'bcrypt';
import { Router, NavigationExtras } from '@angular/router';
import { RestApiService } from '../rest-api.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(private  api:  RestApiService, private  router:  Router) { }
  ngOnInit() {
  }
  register(form) {
    this.api.postUser(form.value).then((res) => {
      this.router.navigateByUrl('/signin');
    });
  }
}
