import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})

export class LoginPage {
  	constructor(public navCtrl: NavController, 
                private router: Router, 
                public loadingCtrl: LoadingController,
                private httpnative: HTTP,
                private storage: Storage) {
                  let username: any;
                  let userid: any;
      storage.get('userid').then((val) => {
        if(val != '' && val != undefined){
          storage.get('tipo').then((val2) => {
            if(val2 == 'e'){
              storage.get('username').then((val3)=> {
                username = val3;
              });
              storage.get('userid').then((val4)=> {
                userid = val4;
              });
              let navigationExtras: NavigationExtras = {
                  queryParams: {
                    urlcrm: 'http://sinauto.dvaweb.mx/crm/',
                    username: username,
                    userid: userid,
                    sessionName: '',
                    tipo: 'e'
                  }
              };
              this.navCtrl.navigateForward(['home'], { state: navigationExtras } );
            }
          })
        }
      });

  	}


}
