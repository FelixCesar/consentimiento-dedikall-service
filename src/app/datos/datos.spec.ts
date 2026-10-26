import { vi } from 'vitest';
import { NgForm } from '@angular/forms';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos } from './datos';

describe('Datos', () => {
  let component: Datos;
  let fixture: ComponentFixture<Datos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
      imports: [Datos],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('does not submit without consent to data processing', () => {
    component.formData = {nombre: 'Ana', apellido: 'Perez', telefono: '612345678', email: '', consiento: false, aceptoComunicaciones: false};
    component.onSubmit({invalid: false, control: {markAllAsTouched() {}}} as unknown as NgForm);
    TestBed.inject(HttpTestingController).expectNone('https://consentimiento-dedikall-backend.vercel.app/datos');
    expect(component.errorMessage).toBeTruthy();
  });
  it('allows a request without commercial calls consent', () => {
    component.formData = {nombre: 'Ana', apellido: 'Perez', telefono: '612345678', email: '', consiento: true, aceptoComunicaciones: false};
    component.onSubmit({invalid: false} as NgForm);
    const request = TestBed.inject(HttpTestingController).expectOne('https://consentimiento-dedikall-backend.vercel.app/datos');
    expect(request.request.body.aceptoComunicaciones).toBe(false);
    request.flush({}, {status: 500, statusText: 'Server Error'});
    expect(component.isLoading).toBe(false);
  });

  it('requires dialog acceptance before checking consent', async () => {
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal = vi.fn();
    dialog.close = vi.fn();
    const checkbox = fixture.nativeElement.querySelector('#consiento') as HTMLInputElement;
    checkbox.click();
    await fixture.whenStable();
    expect(dialog.showModal).toHaveBeenCalled();
    expect(component.formData.consiento).toBe(false);
    (fixture.nativeElement.querySelector('.consent-accept') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(component.formData.consiento).toBe(true);
    expect(checkbox.checked).toBe(true);
    expect(component.formData.aceptoComunicaciones).toBe(false);
    checkbox.click();
    await fixture.whenStable();
    expect(component.formData.consiento).toBe(false);
  });
  it('leaves commercial calls unchecked when the dialog is cancelled', () => {
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal = vi.fn();
    dialog.close = vi.fn();
    component.solicitarConsentimiento(new Event('click', {cancelable: true}), 'aceptoComunicaciones');
    component.cancelarConsentimiento();
    expect(component.formData.aceptoComunicaciones).toBe(false);
    expect(component.consentimientoPendiente).toBeNull();
  });

});
