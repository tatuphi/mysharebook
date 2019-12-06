import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-books-by-cate',
  templateUrl: './books-by-cate.page.html',
  styleUrls: ['./books-by-cate.page.scss'],
})
export class BooksByCatePage implements OnInit {
  booksbycategory: any;
  cname: any;
  cid: any
  // check condition like tab1
  booksShared: any;
  today: Date;
  requests: any;
  NoRequest: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public api: RestApiService, public loadingController: LoadingController,
  ) {
    this.today = new Date();
   }

  ngOnInit() {
    this.cname=this.navParams.data.CategoryName;
    this.cid= this.navParams.data.CaterogyID;
    this.getBooksByCategory(this.cid);
    this.getRequests();
    this.getBooksShared();
    this.getBookSharedWithoutRequest();
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

   // get books by category
   async getBooksByCategory(Category: string) {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBookByCategory(Category)
      .subscribe(res => {
        console.log(res);
        this.booksbycategory = res;
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
        this.booksShared = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
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
}
