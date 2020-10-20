import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentlyreviewPage } from './recentlyreview.page';

describe('RecentlyreviewPage', () => {
  let component: RecentlyreviewPage;
  let fixture: ComponentFixture<RecentlyreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentlyreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
