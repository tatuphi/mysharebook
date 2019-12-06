import { Component } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import {Location} from '@angular/common';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Book } from '../models/book';
import { saveConfig } from '@ionic/core';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  books:any;
  bookk: Book;
  book: any = {};
  sshare: any;
  today:Date;
  //user for test, get userid as logined
  userid:string='2';
 
  


  constructor(public api: RestApiService, public loadingController: LoadingController,public route: ActivatedRoute,
     private location: Location,private alertCtrl: AlertController, private toastController:ToastController ) {
       this.today = new Date();
      }

  async getBooksByOwner() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getBookByOwner(this.userid)
      .subscribe(res => {
        console.log(res);
        this.books = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  
  ngOnInit() {
    this.getBooksByOwner();
    this.getBooksShared();
  }
  async myBackButton(){
    this.location.back();
  }
  async delete(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.deleteBook(id)
      .subscribe(res => {
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
      window.location.reload();
  }
  
  async edit(id){

  }

  async share(id){
    this.bookk = await this.api.getBookById(id).toPromise();
  
    let d1= new Date();
    // let d2= new Date(this.sshare.enddate);
    
      let alert = this.alertCtrl.create({

        message: 'Share Book' + ' "'+ this.bookk.name + '"',
  
        inputs: [
          {
            name: 'startdate',
            label: "Start Date",
            type:'date'
          },
          {
            name: 'enddate',
            label: "End Date",
            type: 'date'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Share',
            handler: data => {   
              let p= this.api.shareBook(this.bookk.id,data.startdate,data.enddate);
              p.then(data=>{
                console.log(data);
              })
            }
          }
        ]
      }).then(alert=> alert.present());
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
