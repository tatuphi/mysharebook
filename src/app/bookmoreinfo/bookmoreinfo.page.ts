import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { Book, Review, ShareBook } from '../models/book';
// import { format } from 'path';


@Component({
  selector: 'app-bookmoreinfo',
  templateUrl: './bookmoreinfo.page.html',
  styleUrls: ['./bookmoreinfo.page.scss'],
})
export class BookmoreinfoPage implements OnInit {
  book: any = {};
  share: any ;
  books:any;
  bookk:Book;
  UserID: string='2';
  reviewsByBook: any;
  users: any;
  bookk1: Book;
  createAt: string;
  cmt:  any = {};
  commentt: Review;
  categories: any;
  public requests: any[] = [];
  ReqConditon:any = {};

  constructor(
    public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getBook();
    this.getBookSharedByBookID();
    this.getReviewByBookID();
    this.getUser();
    this.getCategories();
    this.getRequests();  
    this.getRequestByBookBorrower();  
  }
  
  // get book by id
  async getBook() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getBookById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.book = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  
  // send request to borrow book
  async sendRequest(id){
    this.bookk = await this.api.getBookById(id).toPromise();
    for(let sh of this.share)
    {
      if(sh.book_id==this.bookk.id)
      {
        let alert = this.alertCtrl.create({

          message: 'Request Book' + ' "'+ this.bookk.name + '"',
    
          inputs: [
            {
              name: 'startdate',
              label: "Start Date",
              type:'date',
               value: sh.startdate,
            },
            {
              name: 'enddate',
              label: "End Date",
              type: 'date',
              value: sh.enddate,
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
              text: 'Request',
              handler: data => {
                //just ex userid=3, after login will get userid=username login
                
                let p= this.api.requestBook(this.bookk.id,this.UserID,data.startdate,data.enddate);
                p.then(data=>{
                })
              }
            }
          ]
        }).then(alert=> alert.present());
      }
    }
    
  }

  // get infor share from bookID

  async getBookSharedByBookID(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getBookSharedByBookID(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.share = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }


  // get comment by bookid
  async getReviewByBookID(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getReviewByBookID(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.reviewsByBook = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }


  // get user
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

  // submit a comment
  async postComment(id, content)
  {
    this.bookk1 = await this.api.getBookById(id).toPromise();
    //  this.createAt = new Date().toISOString();
    let p= this.api.postComment(this.bookk1.id,this.UserID,content);
    p.then(data=>{
      console.log(data);
    })
  }

  // delete Comment
  async delete(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.deleteComment(id)
      .subscribe(res => {
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
      window.location.reload();
  }

  async getAComment()
  {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getCommentById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.cmt = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  
  //edit comment
  async editComment(id){
      this.commentt = await this.api.getCommentById(id).toPromise();
      
      let alert = this.alertCtrl.create({
  
        message: 'Edit Comment' ,
  
        inputs: [
          {
            name: 'Content',
            label: "Content ",
            type: 'text',
            value: this.commentt.content,
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
            text: 'Edit',
            handler: data => {
              // this.createAt = new Date().toISOString();
              let p= this.api.updateComment(this.commentt.id,data.Content);
              p.then(data=>{
              })
            }
          }
        ]
      }).then(alert=> alert.present());
    
  }

  // list categories
  async getCategories(){
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getCategories()
    .subscribe(res=>{
      console.log(res);
      this.categories=res;
      loading.dismiss();
    }, err =>{
      console.log(err);
      loading.dismiss();
    })
  }

  // go back
  async goback()
  {
    this.location.back();
  }
  async reload()
  {
    window.location.reload();
  }

  // get all requests
  async getRequests() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getRequestByUserID(this.UserID)
      .subscribe(res => {
        console.log(res);
        this.requests = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  // get request book info by borrower_id and book_id
  async getRequestByBookBorrower() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getRequestByBookBorrower(this.route.snapshot.paramMap.get('id'), this.UserID)
      .subscribe(res => {
        console.log(res);
        this.ReqConditon = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  
}

