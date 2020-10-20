import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentPage } from './recent.page';

describe('RecentPage', () => {
  let component: RecentPage;
  let fixture: ComponentFixture<RecentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
