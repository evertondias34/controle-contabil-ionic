import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LancamentoFormPage } from './lancamento-form.page';

describe('LancamentoFormPage', () => {
  let component: LancamentoFormPage;
  let fixture: ComponentFixture<LancamentoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
