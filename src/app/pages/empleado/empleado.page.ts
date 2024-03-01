import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import * as CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
declare var require: any;
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {
	urlcrm: any; 
	token: any;
	usuario: any;
	contra: any;
	hide: String= 'eye';
	passwordType: String = 'password';
    constructor(public navCtrl: NavController, 
  				private router: Router, 
				public alertCtrl: AlertController, 
				public loadingCtrl: LoadingController,
				private httpnative: HTTP,
				public toastCtrl: ToastController,
				private storage: Storage) { 
  		this.urlcrm = 'http://sinauto.dvaweb.mx/crm/';
    }

    ngOnInit() {
    	
	}

	hideShowPassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
		this.hide = this.hide === 'eye-off' ? 'eye' : 'eye-off';
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
		if(this.usuario == ''){
			this.presentToast('Ingresar un usuario por favor.',2000,'');
			return false;
		}
		if(this.contra == ''){
			this.presentToast('La contraseña no puede ir vacía',2000,'');
			return false;
		}

		/*const loading= await this.loadingCtrl.create({
			message: 'Cargando. Por favor espere...'
		});
		loading.present();*/
		this.httpnative.get(this.urlcrm+'webservice.php?operation=getchallenge&username='+this.usuario,{},{}).then(data => {
			if(data.data.success){
				this.presentAlert('Datos incorrectos','Los datos ingresados son incorrectos.');
				this.presentLoading(loading);
			}else{
				var datos = JSON.parse(data.data);
				
				this.token = datos['result']['token'];
				
				this.httpnative.get(this.urlcrm+'webservice.php?operation=loginwithpass&usuario='+this.usuario+'&contra='+this.contra,{},{}).then(data2 => {
					var valores = JSON.parse(data2.data);
					if(!valores['success']){
						this.presentAlert('Datos incorrectos','Los datos ingresados son incorrectos.');
						this.presentLoading(loading);
					}else{
						
						let accesskey = valores['result'];						
						var md5 = CryptoJS.MD5(this.token+accesskey).toString();
						var datos = { username: this.usuario, accessKey: md5};
						this.httpnative.post(this.urlcrm+'webservice.php?operation=login',datos,{}).then(data3 => {
							var valpost = JSON.parse(data3.data);
							if(!valpost["success"]){
								this.presentAlert('Datos incorrectos','Los datos ingresados son incorrectos.');
								this.presentLoading(loading);
							}else{
								// this.nativeStorage.setItem('access', {'user': this.user.value, 'accessKey': this.accesskey.value})
							// 		.then(() => console.log('Stored Login Data!'), error => console.error('Error storing LoginData', error));  	
			  					let navigationExtras: NavigationExtras = {
								    queryParams: {
								        urlcrm: this.urlcrm,
										username: this.usuario,
										userid: valpost["result"]["userId"],
										sessionName: valpost["result"]["sessionName"],
										tipo: 'e'
								    }
								};
								this.storage.set('urlcrm', this.urlcrm);
								this.storage.set('username', this.usuario);
								this.storage.set('userid',valpost["result"]["userId"]);
								this.storage.set('sessionName', valpost["result"]["sessionName"]);
								this.storage.set('tipo', 'e');
								this.navCtrl.navigateForward(['home'], { state: navigationExtras } );	
								this.presentLoading(loading);
							}
							
						});
					}
				});
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
