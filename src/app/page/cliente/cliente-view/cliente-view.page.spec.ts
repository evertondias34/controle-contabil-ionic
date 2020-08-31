import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteViewPage } from './cliente-view.page';

describe('ClienteViewPage', () => {
  let component: ClienteViewPage;
  let fixture: ComponentFixture<ClienteViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
