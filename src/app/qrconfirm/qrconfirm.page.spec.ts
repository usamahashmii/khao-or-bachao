import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrconfirmPage } from './qrconfirm.page';

describe('QrconfirmPage', () => {
  let component: QrconfirmPage;
  let fixture: ComponentFixture<QrconfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrconfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrconfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
