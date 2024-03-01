import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoferPage } from './chofer.page';

describe('ChoferPage', () => {
  let component: ChoferPage;
  let fixture: ComponentFixture<ChoferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
