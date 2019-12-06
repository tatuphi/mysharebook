import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

import { IonicModule} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthclientService } from './authclient.service';
import { AuthclientGuard } from './authclient.guard';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
  IonicStorageModule.forRoot()],
  providers: [
    AuthclientGuard,
    AuthclientService,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    NativeStorage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
