import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { RestApiService } from '../rest-api.service';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})

export class ActivityPage implements OnInit {
  requests: any;
  users: any;
  sshare: any;
  books: any;
  //user for test, get userid as logined
  userid:string='2';
  booksByOwner: any;
  reqByUser: any;
  today: Date;
 
  @ViewChild('slides', { static: true }) slider: IonSlides;

  segment = 0;

  constructor(
    public api: RestApiService, public loadingController: LoadingController,public route: ActivatedRoute,
    private location: Location,private alertCtrl: AlertController, private toastController:ToastController
  ) { 
    this.today = new Date();
  }

  ngOnInit() {
    this.getRequests();
    this.getUser();
    this.getBooksShared();
    this.getBooks();
    this.getBooksByOwner();
    this.getRequestByUserID();
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  // get all requests
  async getRequests() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getRequests()
      .subscribe(res => {
        console.log(res);
        this.requests = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  // get all users
  async getUser()
    { const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getUser()
      .subscribe(res => {
        console.log(res);
        this.users = res;
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
  // get all books
  async getBooks() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBook()
      .subscribe(res => {
        console.log(res);
        this.books = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  // get books by owner
  async getBooksByOwner() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBookByOwner(this.userid)
      .subscribe(res => {
        console.log(res);
        this.booksByOwner = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  // get books by owner
  async getRequestByUserID() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getRequestByUserID(this.userid)
      .subscribe(res => {
        console.log(res);
        this.reqByUser = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
