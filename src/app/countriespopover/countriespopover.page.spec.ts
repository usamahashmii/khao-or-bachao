import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountriespopoverPage } from './countriespopover.page';

describe('CountriespopoverPage', () => {
  let component: CountriespopoverPage;
  let fixture: ComponentFixture<CountriespopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriespopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountriespopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
