import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Router,NavigationExtras  } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.page.html',
  styleUrls: ['./salidas.page.scss'],
})
export class SalidasPage implements OnInit {
	sessionName: any;
	user: any;
	userid: any;
	urlcrm: any;
	tipo: any;
	buscar: any;
	listados: any;
	hide: boolean= true;
	contratante: any;
	servicio: any;
	fechasalida: any;
	fecharegreso: any;
	kilometrajesalida: any;
	gasolinasalida: any = 100;
	porcegasolina: any = '100%';
	images: any;
	checklist: any;
	photo: SafeResourceUrl;
 	constructor(public navCtrl: NavController, 
  				private router: Router, 
				public alertCtrl: AlertController, 
				public loadingCtrl: LoadingController,
				public toastCtrl: ToastController,
				public http: HTTP,
				private sanitizer: DomSanitizer) { 
  		this.sessionName = this.router.getCurrentNavigation().extras.state.queryParams.sessionName;
    	this.urlcrm = this.router.getCurrentNavigation().extras.state.queryParams.urlcrm;
    	this.user = this.router.getCurrentNavigation().extras.state.queryParams.user;
    	this.userid = this.router.getCurrentNavigation().extras.state.queryParams.userid;
    	this.images = [];
    	if(this.router.getCurrentNavigation().extras.state.queryParams.numcontrato != ''){
    		this.buscar = this.router.getCurrentNavigation().extras.state.queryParams.numcontrato;
    		this.buscar = this.buscar.substring(2);
    		this.onInput(event);
    	}
 	}

  	ngOnInit() {
		
	}
	  
   	async foto(){
   		const image = await Plugins.Camera.getPhoto({
	      quality: 90,
	      allowEditing: false,
	      resultType: CameraResultType.DataUrl,
	      source: CameraSource.Camera
	    });
   		this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
	    this.images.push({ photo: this.photo });
   	}

    onInput(ev: any){
		if(this.buscar == '' || this.buscar == undefined){
			this.presentToast('Favor de ingresar un número de contrato.',2000,'');
			return false;
		}
	    this.http.get(this.urlcrm+'webservice.php?operation=getCheckList&folio=SO'+this.buscar+"&funcion=salida",{},{}).then((data) => {
		  this.listados = [];
		  var valores = JSON.parse(data.data);
	      if(!valores["success"]){
	        this.presentToast('No se encontró el contrato.',2000,'');
	      }else{
			if(valores['result'] == 'nohay'){
				this.presentToast('No se encontró el contrato',2000,'');	 
				return false;
			}
			if(valores['result'] == 'otroestado'){
				this.presentToast('Este contrato no está como reservado, favor de seleccionar otro.',2000,'');	 
				return false;
			}
	        this.presentToast('Mostrando Check List, Espere por favor...',2000,'');	   
	        this.contratante = valores["result"]["contratante"];
	        this.servicio = valores["result"]["servicio"];
	        this.fechasalida = valores["result"]["salida"];
	        this.fecharegreso = valores["result"]["regreso"];
        	for(let c=0;c<valores["result"]["result"].length;c++){
	          this.listados.push({
	          	requisito: valores["result"]["result"][c].requisito,
	            activo:  valores["result"]["result"][c].activo,
	            checked: (valores["result"]["result"][c].activo == 1 ? true : false)
	          });
      	    }
	        
	      }
	    });
	}

	async guardarchecklist(){
		if(this.buscar == ''){
			this.presentToast('No haz seleccionado un contrato, favor de seleccionar uno..',2000,'');
			return false;
		}

		if(this.kilometrajesalida == ''){
			this.presentToast('Capturar Kilometraje de salida.',2000,'');
			return false;
		}

		if(this.images.length == 0){
			this.presentToast('No haz tomado fotografías.',2000,'');
			return false;
		}
		this.checklist = {};
		var elements = (<HTMLInputElement[]><any>document.getElementsByClassName("checklistitems"));
		this.checklist['kms'] = this.kilometrajesalida;
		this.checklist['gas'] = this.gasolinasalida;
		for (let i = 0; i < elements.length; i++) {
			if(elements[i].checked){
				this.checklist[elements[i].name] = 1;
			}else{
				this.checklist[elements[i].name] = 0;
			}
		}
		var datos = { folio: this.buscar, 
					  checklist: JSON.stringify(this.checklist), 
					  userid: this.userid,
					  fotos:JSON.stringify(this.images)};

		const loading= await this.loadingCtrl.create({
			message: 'Guardando. Por favor espere...'
		});
		loading.present();
		this.http.post(this.urlcrm+'webservice.php?operation=guardarsalida',datos,{}).then((data3) => {
			var valores = JSON.parse(data3.data);
			if(!valores['success']){
				this.presentToast('No se guardaron los datos capturados.',2000,'');
				this.presentLoading(loading);
			}else{
					let navigationExtras: NavigationExtras = {
				    queryParams: {
				        urlcrm: this.urlcrm,
						username: this.user,
						userid: this.userid,
						sessionName: this.sessionName,
						tipo: 'e'
				    }
				};						
				this.navCtrl.navigateForward(['home'], { state: navigationExtras } );	
				this.presentLoading(loading);
				this.presentToast('Se han guardado los datos correctamente.',2000,'');
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

	setPorceGasolina(){
		this.porcegasolina = this.gasolinasalida+"%";
	}
	async presentLoading(loading) {
	    await loading.dismiss(); 
	}
}
