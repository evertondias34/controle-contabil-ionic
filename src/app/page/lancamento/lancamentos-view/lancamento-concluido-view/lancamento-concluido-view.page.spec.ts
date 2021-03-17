import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LancamentoConcluidoViewPage } from './lancamento-concluido-view.page';

describe('LancamentoConcluidoViewPage', () => {
  let component: LancamentoConcluidoViewPage;
  let fixture: ComponentFixture<LancamentoConcluidoViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoConcluidoViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoConcluidoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
