import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {
	urlcrm: any; 
	token: any;
	clave: any;
	hide: any; 
    constructor(public navCtrl: NavController, 
  				private router: Router, 
				public alertCtrl: AlertController, 
				public loadingCtrl: LoadingController,
				private httpnative: HTTP,
				public toastCtrl: ToastController,
				private storage: Storage) { 
		this.urlcrm = 'http://sinauto.dvaweb.mx/crm/';
		this.hide = true;
    }

    ngOnInit() {

	}
	
	async presentToast(msg, duration, cssClass) {
	    const toast = await this.toastCtrl.create({
	      message: msg,
	      duration: duration,
	      position: 'top',
	      cssClass: cssClass
	    });

	    await toast.present();
	}

    async login(){
    	// let httpHeader = {
		//   	headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
		//   							   'Access-Control-Allow-Methods':'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
		//   							   'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token',
		//   							   'Accept':'application/x-www-form-urlencoded',
		//   							   'Content-Type': 'application/x-www-form-urlencoded' })
		// };
		if(this.clave == ''){
			this.presentToast('Favor de ingresar una clave.',2000,'');
		}
		const loading= await this.loadingCtrl.create({
			message: 'Cargando. Por favor espere...'
		});
		loading.present();
		this.httpnative.get(this.urlcrm+'webservice.php?operation=chofer&clave='+this.clave, {}, {}).then(data => {
		// this.http.get(this.urlcrm+'webservice.php?operation=chofer&clave='+this.clave,httpHeader).subscribe((data) => {
			var valpost = JSON.parse(data.data);
			if(!valpost["success"]){
				this.presentAlert('Datos incorrectos','Los datos ingresados son incorrectos.');
				this.presentLoading(loading);
			}else{
				if(valpost['result'] == 'error'){
					this.presentAlert('Datos incorrectos','Clave Incorrecta.');
					this.presentLoading(loading);
					return false;
				}else if(valpost['result'] == 'nohaycontratos'){
					this.presentAlert('Clave Correcta','La clave para ingresar es correcta, pero no hay contratos para este chofer.');
					this.presentLoading(loading);
					return false;
				}else if(valpost['result'] == 'nohayorden'){
					this.presentAlert('Clave Correcta','La clave para ingresar es correcta, pero no hay gastos relacionados para este chofer.');
					this.presentLoading(loading);
					return false;
				}else{
					let navigationExtras: NavigationExtras = {
					    queryParams: {
					        urlcrm: this.urlcrm,
							username: '',
							userid: valpost['result'][0],
							sessionName: '',
							tipo: 'c'
					    }
					};
					this.navCtrl.navigateForward(['home'], { state: navigationExtras } );	
					this.presentLoading(loading);
				}
			}
		});
		
	}

	async presentAlert(message,subHeader) {
        const alert = await this.alertCtrl.create({
		    message: message,
		    subHeader: subHeader,
		    buttons: ['Ok']
	    });
	    await alert.present(); 
	}
	async presentLoading(loading) {
	    await loading.dismiss(); 
	}

}
