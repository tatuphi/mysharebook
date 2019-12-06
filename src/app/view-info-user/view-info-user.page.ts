import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-view-info-user',
  templateUrl: './view-info-user.page.html',
  styleUrls: ['./view-info-user.page.scss'],
})
export class ViewInfoUserPage implements OnInit {
  user: any={};
  books: any;
  sshare: any;

  constructor(
    public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getUser();
    this.getBooksByOwner();
    this.getBooksShared();
  }
  
  // get user by id
  async getUser() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getUserById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.user = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  // go back
  async goback()
  {
    this.location.back();
  }

  // get books by owner 
  async getBooksByOwner() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBookByOwner(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.books = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  // get books shared
  async getBooksShared() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBookShared()
      .subscribe(res => {
        console.log(res);
        this.sshare = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
