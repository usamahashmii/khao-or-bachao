import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NointernetPage } from './nointernet.page';

describe('NointernetPage', () => {
  let component: NointernetPage;
  let fixture: ComponentFixture<NointernetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NointernetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NointernetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
