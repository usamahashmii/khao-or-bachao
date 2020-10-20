import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailusPage } from './emailus.page';

describe('EmailusPage', () => {
  let component: EmailusPage;
  let fixture: ComponentFixture<EmailusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
