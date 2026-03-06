import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDatos } from './ver-datos';

describe('VerDatos', () => {
  let component: VerDatos;
  let fixture: ComponentFixture<VerDatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDatos],
    }).compileComponents();

    fixture = TestBed.createComponent(VerDatos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
