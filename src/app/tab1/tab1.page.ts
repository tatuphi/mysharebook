
import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {differenceBy, orderBy, filter} from 'lodash';
import { AuthclientService } from '../authclient.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  books: any;
  booksShared: any;
  today: Date;
  requests: any;
  result: any;
  NoRequest:any;
  user = null;
  constructor(public api: RestApiService, public loadingController: LoadingController,public route: ActivatedRoute,
    private location: Location, private alertCtrl: AlertController, private toastController:ToastController,
    private authclientService: AuthclientService
    ) {
      this.today = new Date();
    }

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

  async getBooksShared() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBookShared()
      .subscribe(res => {
        console.log(res);
        this.booksShared = res;

        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  ngOnInit() {
    
    this.getBooksShared();
    this.getBooks();
    this.getRequests();
    this.getBookSharedWithoutRequest();
  }

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
  
  // DK: book thuoc ds sach dc share trong thoi gian hieu luc
  // sach chua dc request or da request nhung ko dc accept
  async getBookSharedWithoutRequest() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBookSharedWithoutRequest()
      .subscribe(res => {
        console.log(res);
        this.NoRequest = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  // ionViewWillEnter() {
  //   this.authclientService.user().subscribe(
  //     user => {
  //       this.user = user;
  //     }
  //   );
  // }
  
}
