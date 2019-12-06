import { Component, OnInit,Input } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Category } from '../models/book';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-mybook',
  templateUrl: './add-mybook.page.html',
  styleUrls: ['./add-mybook.page.scss'],
})
export class AddMybookPage {
  new_item_form: FormGroup;
  categories: any;
  cateinfo: Category;
  owner: string='2';
  book: any;
  isbn: string='9786047732258';

  // barcode
  num:string;
  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private api: RestApiService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    public navCtrl: NavController, 
    // private barcodeScanner: BarcodeScanner,
    private http: HttpClient) { }
  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      image: new FormControl(''),
      isbn: new FormControl(''),
      name: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl(''),
      category_id: new FormControl('')
    });
    this.getCategories();
    this.getBookByIsbnJson(this.isbn);
  }
  // goBack(){
  //   this.router.navigate(['/home']);
  // }
  async presentAlert() {
    let alert = this.alertCtrl.create({
      header: 'Added Successfully',
      subHeader: 'Your book has just been added to the library',
      buttons: ['OK']
    })
    .then(alert=> alert.present());
  }
   
  async saveBook(image,num, bookname,author,category,description)
  {
    let p= this.api.postBook(image,num,bookname,author,category,description,this.owner);
    p.then(data=>{
      this.presentAlert();
      console.log(data);
    })
    window.location.reload();
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

  // new scan method
  // scan() {
  //   this.barcodeScanner.scan().then(data => {
  //       // this is called when a barcode is found
  //       this.num = data.text
  //     });      
  // }

  async getBookByIsbnJson(num)
  {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getBookByIsbnJson(num)
      .subscribe(res => {
        console.log(res);
        this.book = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
