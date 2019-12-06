import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthclientService } from '../authclient.service';
import { timeout } from 'q';
import { NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  error = '';
  signupSuccess = false;
 
  constructor(private authClientService: AuthclientService,
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
  }
 
  ngOnInit() {
    
  }

// On Register button tap, dismiss login modal and open register modal

login(form: NgForm) {
  this.authClientService.login(form.value.email, form.value.password).subscribe(
    data => {
      this.alertService.presentToast("Logged In");
    },
    error => {
      console.log(error);
    },
    () => {
      this.navCtrl.navigateRoot('/tabs/tab1');
    }
  );
}

  
}
