import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcumuladoPage } from './acumulado.page';

describe('AcumuladoPage', () => {
  let component: AcumuladoPage;
  let fixture: ComponentFixture<AcumuladoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcumuladoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcumuladoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
