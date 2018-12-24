import { Component } from '@angular/core';

import { RewardPage } from './../reward/reward';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RewardPage;
  tab3Root = ContactPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
