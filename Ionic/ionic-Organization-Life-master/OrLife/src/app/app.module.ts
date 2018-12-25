import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { RewardPage } from './../pages/reward/reward';
import { LoginPage } from '../pages/login/login';
import { SettingPage } from '../pages/setting/setting';
import { EventhistoryPage } from '../pages/eventhistory/eventhistory';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { ApiProvider } from '../providers/api/api';


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    RewardPage,
    TabsPage,
    LoginPage,
    SettingPage,
    EventhistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,
      {tabsPlacement: 'bottom',
    }),
    NgxQRCodeModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    RewardPage,
    TabsPage,
    LoginPage,
    SettingPage,
    EventhistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    ApiProvider
  ]
})
export class AppModule {}
