import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatosService, DatosForm } from '../services/datos.service';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <!-- Overlay de éxito (se muestra cuando enviado es true) -->
      <div *ngIf="enviado" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform animate-fade-in">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">¡Enviado!</h2>
          <p class="text-gray-600 mb-8">
            Tus datos han sido enviados correctamente. Nos pondremos en contacto contigo pronto.
          </p>
          <button 
            (click)="volverAlFormulario()"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Volver al formulario
          </button>
        </div>
      </div>

      <dialog #consentDialog class="consent-dialog" aria-labelledby="consent-title" aria-describedby="consent-description" (close)="consentimientoPendiente = null" (cancel)="consentimientoPendiente = null">
        <div class="consent-heading">
          <span class="consent-eyebrow">DEDIKALL · PRIVACIDAD</span>
          <button type="button" class="consent-close" aria-label="Cerrar sin aceptar" (click)="cancelarConsentimiento()">×</button>
          <h2 id="consent-title">{{ consentimientoPendiente === 'consiento' ? 'Tus datos, con tu permiso' : 'Autorización de llamadas comerciales' }}</h2>
          <p id="consent-description">Lee esta información antes de decidir. Tu elección solo se guardará al enviar el formulario.</p>
        </div>
        <div class="consent-content" tabindex="0">
          <ng-container *ngIf="consentimientoPendiente === 'consiento'; else llamadas">
            <h3>Qué datos nos facilitas</h3>
            <p>Al enviar este formulario, facilitas a DEDIKALL tu nombre, apellidos y número de teléfono. Si decides indicar tu correo electrónico, también formará parte de tu solicitud.</p>
            <h3>Para qué los utilizaremos</h3>
            <p>Autorizas el tratamiento de estos datos para registrar y gestionar tu solicitud de información sobre servicios de telecomunicaciones o energía, y para conservar la elección de consentimiento que hayas indicado en este formulario.</p>
            <h3>Las llamadas comerciales se autorizan por separado</h3>
            <p>Aceptar el tratamiento de tus datos no marca la opción de llamadas comerciales. Para que DEDIKALL pueda llamarte con ofertas, debes aceptar también la autorización específica de llamadas. Esa segunda opción es voluntaria.</p>
            <div class="consent-note">Al pulsar «Aceptar tratamiento de datos», confirmas que has leído esta información y autorizas el uso de tus datos para gestionar tu solicitud.</div>
          </ng-container>
          <ng-template #llamadas>
            <h3>Qué estás autorizando</h3>
            <p>Autorizas expresamente a DEDIKALL a utilizar el número de teléfono que has facilitado para realizarte llamadas comerciales y presentarte ofertas de telecomunicaciones o energía.</p>
            <h3>De qué tratarán las llamadas</h3>
            <p>Durante estas llamadas podremos informarte sobre servicios, tarifas, promociones y condiciones comerciales de estas ofertas, y atender las preguntas que tengas sobre ellas.</p>
            <h3>La decisión es tuya</h3>
            <p>Este consentimiento es opcional y está separado del tratamiento de datos necesario para gestionar tu solicitud. Puedes cancelar este diálogo y enviar el formulario sin autorizar llamadas comerciales.</p>
            <h3>Puedes cambiar de opinión</h3>
            <p>Antes de enviar el formulario, puedes desmarcar esta opción. Si después recibes una llamada y ya no deseas recibir más comunicaciones comerciales, puedes comunicarlo durante la llamada y solicitar la retirada de tu consentimiento.</p>
            <div class="consent-note">Al pulsar «Aceptar llamadas comerciales», confirmas que deseas recibir estas llamadas de DEDIKALL en el teléfono indicado.</div>
          </ng-template>
        </div>
        <div class="consent-actions">
          <button type="button" class="consent-cancel" (click)="cancelarConsentimiento()">Ahora no</button>
          <button type="button" class="consent-accept" (click)="aceptarConsentimiento()">{{ consentimientoPendiente === 'consiento' ? 'Aceptar tratamiento de datos' : 'Aceptar llamadas comerciales' }}</button>
        </div>
      </dialog>

      <div class="max-w-3xl mx-auto">
        <!-- Header con logo como imagen -->
        <div class="text-center mb-8">
          <img 
            src="ddk.png" 
            alt="Dedikall" 
            class="h-56 mx-auto"
          >

        </div>

        <!-- Descripción -->
        <p class="text-center text-gray-600 mb-8">
          Si estás interesado en recibir una oferta de telecomunicaciones o energía 
          rellena el formulario y nos pondremos en contacto contigo.
        </p>

        <!-- Aviso de campos obligatorios -->
        <p class="text-sm text-gray-500 mb-4">
          Los campos marcados con el símbolo asterisco (*) son obligatorios.
        </p>

        <!-- Formulario -->
        <form (ngSubmit)="onSubmit(datosForm)" #datosForm="ngForm" class="bg-white shadow-xl rounded-lg p-8 space-y-6">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              name="nombre"
              [(ngModel)]="formData.nombre"
              required
              [disabled]="isLoading || enviado"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Tu nombre"
            >
          </div>

          <!-- Apellido -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Apellido <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              name="apellido"
              [(ngModel)]="formData.apellido"
              required
              [disabled]="isLoading || enviado"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Tu apellido"
            >
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Teléfono <span class="text-red-500">*</span>
            </label>
            <input 
              type="tel"
              name="telefono"
              pattern="[+0-9() .-]{6,20}"
              [(ngModel)]="formData.telefono"
              required
              [disabled]="isLoading || enviado"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="612345678"
            >
          </div>

          <!-- Correo electrónico -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input 
              type="email"
              name="email"
              email
              [(ngModel)]="formData.email"
              [disabled]="isLoading || enviado"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="tu@email.com"
            >
          </div>

          <!-- Checkboxes -->
          <div class="space-y-4 pt-6 border-t border-gray-100">
            <p class="text-xs text-gray-500">Pulsa cada opción para leer y confirmar tu consentimiento.</p>
            <!-- Consiento -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  type="checkbox"
                  id="consiento"
                  name="consiento"
                  [(ngModel)]="formData.consiento"
                  (click)="solicitarConsentimiento($event, 'consiento')"
                  required
                  [disabled]="isLoading || enviado"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="consiento" class="font-medium text-gray-700">
                  Acepto el tratamiento de mis datos personales. <span class="text-red-500">*</span>
                </label>
              </div>
            </div>

            <!-- Acepto comunicaciones -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  type="checkbox"
                  id="aceptoComunicaciones"
                  name="aceptoComunicaciones"
                  [(ngModel)]="formData.aceptoComunicaciones"
                  (click)="solicitarConsentimiento($event, 'aceptoComunicaciones')"
                  [disabled]="isLoading || enviado"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="aceptoComunicaciones" class="font-medium text-gray-700">
                  Acepto recibir llamadas comerciales de DEDIKALL (opcional).
                </label>
              </div>
            </div>
          </div>

          <!-- Botón de enviar -->
          <div class="pt-4">
            <!-- MOSTRAR BOTÓN DIFERENTE SEGÚN EL ESTADO -->
            <button 
              *ngIf="!enviado"
              type="submit"
              [disabled]="datosForm.invalid || isLoading"
              class="w-full py-4 px-6 rounded-lg font-medium text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              [class.bg-blue-600]="!isLoading"
              [class.hover:bg-blue-700]="!isLoading"
              [class.text-white]="!isLoading"
              [class.bg-gray-400]="isLoading"
            >
              <span *ngIf="!isLoading">Enviar</span>
              <span *ngIf="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            </button>

            <!-- Botón de "Enviado" cuando ya se envió -->
            <button 
              *ngIf="enviado"
              type="button"
              disabled
              class="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-medium text-lg opacity-75 cursor-not-allowed flex items-center justify-center"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              ¡Enviado!
            </button>
          </div>

          <!-- Mensaje de error si algo falla -->
          <div *ngIf="errorMessage" class="text-red-500 text-sm text-center">
            {{ errorMessage }}
          </div>
        </form>

      </div>
    </div>
  `,
  styles: [`
    .consent-dialog { border: 0; padding: 0; border-radius: 24px; width: min(560px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); margin: auto; color: #334155; box-shadow: 0 24px 80px #0f172a40; }
    .consent-dialog[open] { display: flex; flex-direction: column; }
    .consent-dialog::backdrop { background: #0f172a99; backdrop-filter: blur(4px); }
    .consent-heading { padding: 28px 28px 20px; position: relative; border-bottom: 1px solid #e2e8f0; }
    .consent-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; color: #2563eb; }
    .consent-heading h2 { font-size: 24px; line-height: 1.25; font-weight: 700; color: #0f172a; margin: 12px 24px 10px 0; }
    .consent-heading p { font-size: 13px; line-height: 1.6; color: #64748b; }
    .consent-close { position: absolute; top: 16px; right: 18px; font-size: 28px; color: #64748b; cursor: pointer; }
    .consent-content { padding: 4px 28px 24px; overflow-y: auto; min-height: 0; font-size: 14px; line-height: 1.7; }
    .consent-content h3 { font-weight: 600; color: #0f172a; margin: 20px 0 6px; }
    .consent-note { margin-top: 20px; padding: 14px 16px; background: #eff6ff; border-radius: 12px; color: #1e40af; }
    .consent-actions { padding: 18px 28px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px; justify-content: flex-end; }
    .consent-actions button { border-radius: 10px; padding: 12px 16px; font-size: 13px; font-weight: 600; cursor: pointer; }
    .consent-cancel { background: #f1f5f9; color: #475569; }
    .consent-accept { background: #2563eb; color: white; }
    .consent-accept:hover { background: #1d4ed8; }
    .consent-dialog button:focus-visible { outline: 3px solid #60a5fa; outline-offset: 3px; }
    @media (max-width: 480px) { .consent-actions { flex-direction: column-reverse; } .consent-heading, .consent-actions { padding: 20px; } .consent-content { padding: 0 20px 20px; } }
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  `]
})
export class Datos {
  
  formData: DatosForm = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    consiento: false,
    aceptoComunicaciones: false
  };

  @ViewChild('consentDialog') consentDialog!: ElementRef<HTMLDialogElement>;
  consentimientoPendiente: 'consiento' | 'aceptoComunicaciones' | null = null;

  solicitarConsentimiento(event: Event, campo: 'consiento' | 'aceptoComunicaciones') {
    if (this.formData[campo]) return;
    event.preventDefault();
    this.consentimientoPendiente = campo;
    this.consentDialog.nativeElement.showModal();
  }

  aceptarConsentimiento() {
    if (this.consentimientoPendiente) this.formData[this.consentimientoPendiente] = true;
    this.cancelarConsentimiento();
  }

  cancelarConsentimiento() {
    this.consentDialog.nativeElement.close();
    this.consentimientoPendiente = null;
  }

  isLoading = false;
  enviado = false;
  errorMessage = '';

  constructor(  private datosService: DatosService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid || !this.formData.consiento || !this.formData.nombre.trim() || !this.formData.apellido.trim()) {
      form.control.markAllAsTouched();
      this.errorMessage = "Completa los campos obligatorios y acepta el tratamiento de datos.";
      return;
    }
    // Prevenir múltiples envíos
    if (this.isLoading || this.enviado) return;
    
    this.isLoading = true;
    this.errorMessage = '';


this.datosService.guardarDatos(this.formData).subscribe({
  next: (response) => {

    this.isLoading = false;

    // REDIRECCIÓN
    this.router.navigate(['/enviado']);
  },
  error: (error) => {

    this.isLoading = false;

    if (error.status === 0) {
      this.errorMessage = 'No se pudo conectar con el servidor';
    } else {
      this.errorMessage = 'Error al guardar en la base de datos';
    }
  }
});
  }

  volverAlFormulario() {
    this.enviado = false;
    // Resetear formulario
    this.formData = {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      consiento: false,
      aceptoComunicaciones: false
    };
  }
}