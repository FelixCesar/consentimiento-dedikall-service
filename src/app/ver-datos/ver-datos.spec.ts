import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDatosComponent } from './ver-datos';

describe('VerDatosComponent', () => {
  let component: VerDatosComponent;
  let fixture: ComponentFixture<VerDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
      imports: [VerDatosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerDatosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
