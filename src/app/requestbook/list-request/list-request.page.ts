import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { RestApiService } from '../../rest-api.service';
import { Book, UserInfo } from '../../models/book';


@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.page.html',
  styleUrls: ['./list-request.page.scss'],
})
export class ListRequestPage implements OnInit {
  booksByOwner:any;
  bookk: Book;
  userr: UserInfo;
  requests: any;
  users: any;
  createAt: string;
  isaccepted: boolean;
  requestsByUserID: any;
  
  books: any;

  //user for test, get userid as logined
  userid:string='3';
  

  constructor(public api: RestApiService, public loadingController: LoadingController,public route: ActivatedRoute,
    private location: Location,private alertCtrl: AlertController, private toastController:ToastController) { }

  ngOnInit() {
    this.getRequests();
    this.getBooksByOwner();
    this.getUser();
    this.getRequestByUserID();
    this.getBooks();
  }

  async getBooksByOwner() {
    //  this.OwnerID='2';
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

  async agree(id){
    this.isaccepted=true;
    //this.createAt = new Date().toISOString();
    this.api.updateRequest(id,this.isaccepted)
    .then(data=>{
    })
  }
  
  async disagree(id){
    this.isaccepted=false;
    //this.createAt = new Date().toISOString();
    this.api.updateRequest(id,this.isaccepted)
    .then(data=>{
    })
  }

  // get request by borrower, to announce they can borrow that book
  async getRequestByUserID() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getRequestByUserID(this.userid)
      .subscribe(res => {
        console.log(res);
        this.requestsByUserID = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
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



}
