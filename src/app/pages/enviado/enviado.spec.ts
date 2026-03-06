import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enviado } from './enviado';

describe('Enviado', () => {
  let component: Enviado;
  let fixture: ComponentFixture<Enviado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enviado],
    }).compileComponents();

    fixture = TestBed.createComponent(Enviado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
