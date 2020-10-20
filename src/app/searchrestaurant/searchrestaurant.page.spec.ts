import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchrestaurantPage } from './searchrestaurant.page';

describe('SearchrestaurantPage', () => {
  let component: SearchrestaurantPage;
  let fixture: ComponentFixture<SearchrestaurantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchrestaurantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchrestaurantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
