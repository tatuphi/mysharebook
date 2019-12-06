import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.page.html',
  styleUrls: ['./bookdetail.page.scss'],
})
export class BookdetailPage implements OnInit {
  book: any = {};
  books:any;
  categories: any;

  constructor(
    public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    private location: Location) { }

  ngOnInit() {
    this.getBook();
    this.getCategories();
  }
  
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
  async getBooks() {
    window.location.reload();
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
  async delete(id) {
    const loading = await this.loadingController.create({
      message: 'Deleting'
    });
    await loading.present();
    await this.api.deleteBook(id)
      .subscribe(res => {
        loading.dismiss();
        this.location.back();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
      this.getBooks();
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
}
