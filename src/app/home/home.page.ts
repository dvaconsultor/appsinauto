import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomeComponent {
	sessionName: any;
	user: any;
	userid: any;
	urlcrm: any;
	tipo: any;
	hidE: any;
	hidC: any;
	
    constructor(public navCtrl: NavController, 
  				private router: Router, 
				public alertCtrl: AlertController, 
				public loadingCtrl: LoadingController,
				private storage: Storage) { 
    	if(this.router.getCurrentNavigation().extras.state.queryParams){
    		this.sessionName = this.router.getCurrentNavigation().extras.state.queryParams.sessionName;
	    	this.urlcrm = this.router.getCurrentNavigation().extras.state.queryParams.urlcrm;
	    	this.user = this.router.getCurrentNavigation().extras.state.queryParams.user;
	    	this.userid = this.router.getCurrentNavigation().extras.state.queryParams.userid;
	    	if(this.router.getCurrentNavigation().extras.state.queryParams.tipo == 'e'){
	    		this.hidC = true;
	    		this.hidE = false;
	    	}else{
	    		this.hidE = true;
	    		this.hidC = false;
	    	}
    	}
    	
    }

    salidas(){
    	let navigationExtras: NavigationExtras = {
		    queryParams: {
		        urlcrm: this.urlcrm,
				username: this.user,
				userid: this.userid,
				sessionName: this.sessionName,
				numcontrato: ''
		    }
		};						
		this.navCtrl.navigateForward(['salidas'], { state: navigationExtras });	
    }

    entradas(){
    	let navigationExtras: NavigationExtras = {
		    queryParams: {
		        urlcrm: this.urlcrm,
				username: this.user,
				userid: this.userid,
				sessionName: this.sessionName,
				numcontrato: ''
		    }
		};						
		this.navCtrl.navigateForward(['entradas'], { state: navigationExtras });	
    }

    servicios(){
    	let navigationExtras: NavigationExtras = {
		    queryParams: {
		        urlcrm: this.urlcrm,
				username: this.user,
				userid: this.userid,
				sessionName: this.sessionName
		    }
		};						
		this.navCtrl.navigateForward(['servicios'], { state: navigationExtras });	
    }

    gastos(){
    	let navigationExtras: NavigationExtras = {
		    queryParams: {
		        urlcrm: this.urlcrm,
		        orderid: this.userid
		    }
		};						
		this.navCtrl.navigateForward(['gastos'], { state: navigationExtras });	
    }

    logout(){
    	this.presentConfirm();
    }


    async presentConfirm() {
        const alert = await this.alertCtrl.create({
		    header: '¿Deseas cerrar sesión?',
	        message: 'Podrías perder lo que no haz guardado.',
	        buttons: [{
				        text: 'Cancelar',
				        role: 'cancel',
				        handler: () => {}
				      },
				      {
				        text: 'Salir',
				        handler: () => {
							this.storage.set('urlcrm','');
							this.storage.set('username','');
							this.storage.set('userid','');
							this.storage.set('sessionName', '');
							this.storage.set('tipo', '');
				          	this.navCtrl.navigateRoot("login");	
				        }
				      }]
	    });
	    await alert.present(); 
	}

}
