import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservenewPage } from './reservenew.page';

describe('ReservenewPage', () => {
  let component: ReservenewPage;
  let fixture: ComponentFixture<ReservenewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservenewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservenewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
