import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalidainfoComponent } from './salidainfo.component';

describe('SalidainfoComponent', () => {
  let component: SalidainfoComponent;
  let fixture: ComponentFixture<SalidainfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidainfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalidainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
