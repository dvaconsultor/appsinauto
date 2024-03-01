import { NavController, LoadingController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { Router,NavigationExtras  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';
import { HTTP } from '@ionic-native/http/ngx';
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
	orderid: any;
	urlcrm: any;
	acumulado: any;
	producto: any;
	cantidad: any = 0;
	precio: any = 0;
	comentario: any;
	total: any = 0;
	gastos: any[];
	options: any;
    constructor(public navCtrl: NavController, 
  				private router: Router, 
				public alertCtrl: AlertController, 
				public loadingCtrl: LoadingController,
				public toastCtrl: ToastController,
				public http: HTTP,
				public popoverCtrl: PopoverController) { 
    	this.orderid = this.router.getCurrentNavigation().extras.state.queryParams.orderid;
		this.urlcrm = this.router.getCurrentNavigation().extras.state.queryParams.urlcrm;
		this.options = [];
		this.options.push({value: '671',text:'COMBUSTIBLE'},
						  {value: '296695',text:'ESTACIONAMIENTO'},
						  {value: '4369',text:'REFACCIONES'},
						  {value: '292490',text:'COMIDA'},
						  {value: '292509',text:'CASETAS'},
						  {value: '295000',text:'CASETAS TOMADAS'},
						  {value: '295031',text:'ARTÍCULOS DE LIMPIEZA'},
						  {value: '292491',text:'HOSPEDAJE'});
    }

    ngOnInit() {

	    this.http.get(this.urlcrm+'webservice.php?operation=acumulado&orderid='+this.orderid,{},{}).then((data) => {
			var datos = JSON.parse(data.data);
	      	this.acumulado = datos['result']['acumulado'];
	      	this.gastos = datos['result']['gastos'];
	    });
	}

    async mostrarPopUP(event){
    	const popover = await this.popoverCtrl.create({
    		component: PopinfoComponent,
			event: event,
			mode: 'ios',
			componentProps:{acu:this.acumulado, gastos: this.gastos}
    	});
    	await popover.present();
    }

    calcular(){
		this.total = this.cantidad * this.precio;
    	this.total = this.formataNumero (this.total,'.',2);
    }

    async guardargasto(){
		if(this.producto == ''){
			this.presentToast('Favor de seleccionar un gasto autoirzado.',2000,'');
			return false;
		}

		if(this.cantidad == ''){
			this.presentToast('Favor de capturar la cantidad.',2000,'');
			return false;
		}

		if(this.precio == ''){
			this.presentToast('Favor de capturar el precio del gasto autorizado.',2000,'');
			return false;
		}

		var datos = {	
		product: this.producto,
		cantidad: this.cantidad,
		precio: this.precio,
		comment: this.comentario,
		orderid: this.orderid,
		acumulado:((this.acumulado*1)+(this.total)*1)};

		const loading= await this.loadingCtrl.create({
			message: 'Guardando. Por favor espere...'
		});
		loading.present();
		this.http.post(this.urlcrm+'webservice.php?operation=guardargasto',datos,{}).then((data3) => {
			var valores = JSON.parse(data3.data);
			if(!valores['success']){
				this.presentToast('No se guardaron los datos capturados.',2000,'');
				this.presentLoading(loading);
			}else{			 	
				this.presentToast('Se guardaron los gastos correctamente!.',2000,'');
				this.presentLoading(loading);
				this.gastos.push({
					gasto: valores['result'][2],
					cantidad: this.cantidad,
					precio: this.precio,
					totalgasto: this.total,
					comment: valores['result'][1]
				});				
				this.acumulado += this.total;
				this.cantidad = 0;
				this.precio = 0;
				this.total = 0.00
				this.comentario = '';
				this.producto = '';
			}
			
		});
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

	async confirm(header,message) {
        const alert = await this.alertCtrl.create({
		    header: header,
	        message: message,
	        buttons: [{
				        text: 'Cancelar',
				        role: 'cancel',
				        handler: () => {
							return false;
						}
				      },
				      {
				        text: 'Continuar',
				        handler: () => {
				          this.guardargasto();	
				        }
				      }]
	    });
	    await alert.present(); 
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

	formataNumero(e: any, separador: string = '.', decimais: number = 2) {
		let a:any = e.value.split('');
		let ns:string = '';
		a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
		ns = parseInt(ns).toString();
		if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
		let ans = ns.split('');
		let r = '';
		for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
		e.value = r;
	  }
}
