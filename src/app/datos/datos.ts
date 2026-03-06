import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
        <form (ngSubmit)="onSubmit()" #datosForm="ngForm" class="bg-white shadow-xl rounded-lg p-8 space-y-6">
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
              [(ngModel)]="formData.email"
              [disabled]="isLoading || enviado"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="tu@email.com"
            >
          </div>

          <!-- Checkboxes -->
          <div class="space-y-4 pt-4 border-t">
            <!-- Consiento -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  type="checkbox"
                  name="consiento"
                  [(ngModel)]="formData.consiento"
                  required
                  [disabled]="isLoading || enviado"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                >
              </div>
              <div class="ml-3 text-sm">
                <label class="font-medium text-gray-700">
                  Consiento el tratamiento de mis datos en los términos establecidos en la política de privacidad de SYNERGY <span class="text-red-500">*</span>
                </label>
              </div>
            </div>

            <!-- Acepto comunicaciones -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  type="checkbox"
                  name="aceptoComunicaciones"
                  [(ngModel)]="formData.aceptoComunicaciones"
                  [disabled]="isLoading || enviado"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                >
              </div>
              <div class="ml-3 text-sm">
                <label class="font-medium text-gray-700">
                  Acepto recibir comunicaciones comerciales personalizadas por parte de SYNERGY acorde a lo establecido en la política de privacidad
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

  isLoading = false;
  enviado = false;
  errorMessage = '';

  constructor(  private datosService: DatosService, private router: Router) {}

  onSubmit() {
    // Prevenir múltiples envíos
    if (this.isLoading || this.enviado) return;
    
    this.isLoading = true;
    this.errorMessage = '';

    console.log('Enviando datos:', this.formData);

this.datosService.guardarDatos(this.formData).subscribe({
  next: (response) => {
    console.log('Datos guardados:', response);

    this.isLoading = false;

    // REDIRECCIÓN
    this.router.navigate(['/enviado']);
  },
  error: (error) => {
    console.error(error);

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