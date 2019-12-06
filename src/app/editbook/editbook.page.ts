import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { Book } from '../models/book';


@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.page.html',
  styleUrls: ['./editbook.page.scss'],
})
export class EditbookPage implements OnInit {
  id: string;
  book: any = {};
  books:any;
  categories:any;
  constructor(public api: RestApiService,
  public loadingController: LoadingController,
  private route: ActivatedRoute,
  public router: Router,
  private formBuilder: FormBuilder) { this.book = new Book();}

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
  update() {
   

    //Update item by taking id and updated data object
    this.api.updateBook(this.book).then(data=>{
      console.log(data);
    })
      //this.router.navigate(['tabs/tab2']);
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
