import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salidainfo',
  templateUrl: './salidainfo.component.html',
  styleUrls: ['./salidainfo.component.scss'],
})
export class SalidainfoComponent implements OnInit {
  listados: any;
  porcegassalida: any;
  gassalida: any;
  kmssalida: any;
  constructor() { }

  ngOnInit() {}

}
