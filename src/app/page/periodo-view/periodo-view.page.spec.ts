import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PeriodoViewPage } from './periodo-view.page';

describe('PeriodoViewPage', () => {
  let component: PeriodoViewPage;
  let fixture: ComponentFixture<PeriodoViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
