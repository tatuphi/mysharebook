import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: any = {};
  // ex for userid= 2
  myid: string='1';

  constructor(public api: RestApiService, public loadingController: LoadingController,public route: ActivatedRoute,
    private location: Location,private alertCtrl: AlertController, private toastController:ToastController, public router: Router ) {}
  async getUser() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    
    await this.api.getUserById(this.myid)
      .subscribe(res => {
        console.log(res);
        this.user = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  ngOnInit() {
    this.getUser();
  }
  
  update() {
    //Update item by taking id and updated data object
    this.api.updateUser(this.user).then(data=>{
    })
    // this.router.navigate(['tabs/tab2']);
    
  }

}
