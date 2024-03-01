import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.page.html',
  styleUrls: ['./detalle-servicio.page.scss'],
})
export class DetalleServicioPage implements OnInit {
	sessionName: any;
	user: any;
	userid: any;
	urlcrm: any;
	id: any;
	vehiculo: any;
	contratos: any[];
    constructor(public navCtrl: NavController, 
  				private router: Router, 
				public alertCtrl: AlertController, 
				public loadingCtrl: LoadingController,
				public toastCtrl: ToastController,
				public http: HTTP) { 
  			this.sessionName = this.router.getCurrentNavigation().extras.state.queryParams.sessionName;
	    	this.urlcrm = this.router.getCurrentNavigation().extras.state.queryParams.urlcrm;
	    	this.user = this.router.getCurrentNavigation().extras.state.queryParams.user;
	    	this.userid = this.router.getCurrentNavigation().extras.state.queryParams.userid;
	    	this.id = this.router.getCurrentNavigation().extras.state.queryParams.idservicio;
	    	this.vehiculo = this.router.getCurrentNavigation().extras.state.queryParams.name;
    }

    ngOnInit() {

	    this.http.get(this.urlcrm+'webservice.php?operation=detalles&id='+this.id,{},{}).then((data) => {
			var valores = JSON.parse(data.data);
	        this.contratos = [];
	        if(valores['result'][0]['result'] == 'sincontratos'){
	      		this.contratos.push({
	      			sono: 'Sin contratos',
	      			restado: ''
	      		})
	        }else{
	      		for(let c=0;c<valores["result"].length;c++){
	          		this.contratos.push({
	          			sono: valores["result"][c].sono,
	            		estado: valores["result"][c].estado
	          		});
      	    	}  	
	      	}
	      
	    });
    }

    itemTapped ( event, contrato ){
    	if(contrato.sono == 'Sin contratos'){
    		this.presentToast('No hay contratos.',2000,'');
    		return false;
    	}
    	for(let c=0;c<this.contratos.length;c++){
  			if(this.contratos[c].estado == 'En Servicio'){
  				if(this.contratos[c].sono == contrato.sono){
  					let navigationExtras: NavigationExtras = {
					    queryParams: {
					        urlcrm: this.urlcrm,
							username: this.user,
							userid: this.userid,
							sessionName: this.sessionName,
							numcontrato: contrato.sono
					    }
					};						
					this.navCtrl.navigateForward(['entradas'], { state: navigationExtras } );
					return true;
  				}else{
  					this.presentToast('Ya hay otro contrato en Servicio, favor de finalizarlo.',2000,'');
  					return false;
  				}
  			}      		
	    }
	    let navigationExtras: NavigationExtras = {
		    queryParams: {
		        urlcrm: this.urlcrm,
				username: this.user,
				userid: this.userid,
				sessionName: this.sessionName,
				numcontrato: contrato.sono
		    }
		};						
		this.navCtrl.navigateForward(['salidas'], { state: navigationExtras } );
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

}
