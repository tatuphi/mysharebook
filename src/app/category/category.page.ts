import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { BooksByCatePage } from '../books-by-cate/books-by-cate.page';
import { Category } from '../models/book';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  books: any;
  categories: any;
  dataReturned:any;
  cateById: Category;

  constructor(public api: RestApiService, public loadingController: LoadingController,public route: ActivatedRoute,
    private location: Location,private alertCtrl: AlertController, private toastController:ToastController,
    public modalController: ModalController ) { }

  ngOnInit() {
    this.getCategories();
    this.getBooks();
   
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

  // get all categories
  async getCategories() {
    const loading= await this.loadingController.create({
      message: 'Loading'
    })
    await loading.present();
    await this.api.getCategories()
      .subscribe(res => {
        console.log(res);
        this.categories = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async openModal(id) {
    this.cateById = await this.api.getCategoryById(id).toPromise();
    const modal = await this.modalController.create({
      component: BooksByCatePage,
      componentProps: {
        "CategoryName": this.cateById.name,
        "CaterogyID": id
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

  
}
