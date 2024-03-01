import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
	sessionName: any;
	user: any;
	userid: any;
	urlcrm: any;
	servicios: any;
	allData: any[];
	categoria: any;
	ubicacion: any;
	buscar = '';
	columna = '';
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
 	}

  	ngOnInit() {

	    this.http.get(this.urlcrm+'webservice.php?operation=servicios',{},{}).then((data) => {
		  this.servicios = [];
		  var datos = JSON.parse(data.data);
	      for(let c=0;c<datos["result"].length;c++){
	          this.servicios.push({
	          	servicio: datos["result"][c].servicio,
	            categoria:  datos["result"][c].categoria,
	            placas: datos["result"][c].placas,
	            ubicacion: datos["result"][c].ubicacion,
				id: datos["result"][c].id,
				img: (datos["result"][c].img != '' ? datos["result"][c].img : 'assets/noimage.jpg')
	          });
      	    }  
      	    this.allData = this.servicios;
	    });
    }

    onClick( event, servicio ){
    	let navigationExtras: NavigationExtras = {
		    queryParams: {
		        urlcrm: this.urlcrm,
				username: this.user,
				userid: this.userid,
				sessionName: this.sessionName,
				idservicio: servicio.id,
				name: servicio.servicio
		    }
		};						
		this.navCtrl.navigateForward(['detalle-servicio'], { state: navigationExtras } );
    }


    onInput(event){
    	this.columna = 'servicio';
    	this.buscar = event.detail.value;
    }

    catChange(event){
    	var column = event.detail.value.toLowerCase();
    	this.servicios = this.allData;
    	
    	this.servicios = this.servicios.filter( item => {
    		if((this.ubicacion != '' && this.ubicacion != undefined ) && this.buscar != '' ){
    			return item.ubicacion.toLowerCase().includes( this.ubicacion.toLowerCase() ) && item.categoria.toLowerCase().includes( column ) && item.servicio.toLowerCase().includes( this.buscar.toLowerCase() );	
    		}

    		if((this.ubicacion != '' && this.ubicacion !== undefined ) && this.buscar === ''){
    			return item.ubicacion.toLowerCase().includes( this.ubicacion.toLowerCase() ) && item.categoria.toLowerCase().includes( column );	
    		}

    		if((this.ubicacion === '' || this.ubicacion === undefined ) && this.buscar != ''){
    			return item.categoria.toLowerCase().includes( column ) && item.servicio.toLowerCase().includes( this.buscar.toLowerCase() );	
    		}

    		if((this.ubicacion === '' || this.ubicacion === undefined ) && this.buscar === ''){
    			return item.categoria.toLowerCase().includes( column );	
    		}
    		
    	});
    }

    ubiChange(event){
    	var column = event.detail.value.toLowerCase();
       	this.servicios = this.allData;

    	this.servicios = this.servicios.filter( item => {
    		if((this.categoria != '' && this.categoria != undefined ) && this.buscar != '' ){
    			return item.ubicacion.toLowerCase().includes( column ) && item.categoria.toLowerCase().includes( this.categoria.toLowerCase() ) && item.servicio.toLowerCase().includes( this.buscar.toLowerCase() );	
    		}

    		if((this.categoria != '' && this.categoria != undefined ) && this.buscar === ''){
    			return item.ubicacion.toLowerCase().includes( column ) && item.categoria.toLowerCase().includes( this.categoria.toLowerCase() );	
    		}

    		if((this.categoria === '' || this.categoria === undefined ) && this.buscar != ''){
    			return item.ubicacion.toLowerCase().includes( column ) && item.servicio.toLowerCase().includes( this.buscar.toLowerCase() );	
    		}

    		if((this.categoria === '' || this.categoria === undefined ) && this.buscar === ''){
    			return item.ubicacion.toLowerCase().includes( column );	
    		}
    		
    	});
    }

    cancelar(){
    	this.presentCancelar();
    }

    async presentCancelar() {
        const alert = await this.alertCtrl.create({
		    header: '¿Deseas volver a la página principal?',
	        message: 'Podrías perder lo que llevas guardado.',
	        buttons: [{
				        text: 'Si',
				        role: 'cancel',
				        handler: () => {
				        	this.navCtrl.navigateBack("home");	
				        }
				      },
				      {
				        text: 'No',
				        handler: () => {}
				      }]
	    });
	    await alert.present(); 
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
	async presentLoading(loading) {
	    await loading.dismiss(); 
	}

	async presentAlert(message,subHeader) {
        const alert = await this.alertCtrl.create({
		    message: message,
		    subHeader: subHeader,
		    buttons: ['Ok']
	    });
	    await alert.present(); 
	}
}
