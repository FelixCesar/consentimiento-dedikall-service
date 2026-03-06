import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService, DatosForm } from '../services/datos.service';

// Interfaz para la respuesta del API
interface ApiResponse {
  data: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    consiento: boolean;
    aceptoComunicaciones: boolean;
    createdAt: string;
    url: string;
  }
}

@Component({
  selector: 'app-ver-datos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <!-- Loader mientras carga -->
      <div *ngIf="cargando" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 flex items-center">
          <svg class="animate-spin h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-700">Cargando datos...</span>
        </div>
      </div>

      <!-- Mensaje de error -->
      <div *ngIf="error" class="max-w-3xl mx-auto">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg class="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-lg font-medium text-red-800 mb-2">Error al cargar los datos</h3>
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button 
            (click)="volverAtras()"
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Volver
          </button>
        </div>
      </div>

      <!-- Visualización de datos (solo lectura) -->
      <div *ngIf="!cargando && !error && datos" class="max-w-3xl mx-auto">
        <!-- Header con logo como imagen -->
        <div class="text-center mb-8">
          <!-- Aquí va la imagen -->
          <img 
            src="ddk.png" 
            alt="Synergy Telecom" 
            class="h-56 mx-auto "
          >

          <div class="mt-4 inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span class="font-medium">Vista de solo lectura</span>
          </div>
        </div>

        <!-- Descripción con el ID -->
        <p class="text-center text-gray-600 mb-8">
          Visualizando los datos del registro: <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ id }}</span>
        </p>

        <!-- Formulario de visualización (solo lectura) -->
        <div class="bg-white shadow-xl rounded-lg p-8 space-y-6">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              [value]="datos.nombre"
              readonly
              disabled
              class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
            >
          </div>

          <!-- Apellido -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Apellido <span class="text-red-500">*</span>
            </label>
            <input 
              type="text"
              [value]="datos.apellido"
              readonly
              disabled
              class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
            >
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Teléfono <span class="text-red-500">*</span>
            </label>
            <input 
              type="tel"
              [value]="datos.telefono"
              readonly
              disabled
              class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
            >
          </div>

          <!-- Correo electrónico -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input 
              type="email"
              [value]="datos.email || 'No proporcionado'"
              readonly
              disabled
              class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
            >
          </div>

          <!-- Checkboxes (solo lectura) -->
          <div class="space-y-4 pt-4 border-t">
            <!-- Consiento -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  type="checkbox"
                  [checked]="datos.consiento"
                  disabled
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded bg-gray-100"
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
                  [checked]="datos.aceptoComunicaciones"
                  disabled
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded bg-gray-100"
                >
              </div>
              <div class="ml-3 text-sm">
                <label class="font-medium text-gray-700">
                  Acepto recibir comunicaciones comerciales personalizadas por parte de SYNERGY acorde a lo establecido en la política de privacidad
                </label>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t text-sm text-gray-500">
            <p>Fecha de registro: {{ datos.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
          </div>

          <div class="pt-4">
            <button 
              (click)="volverAtras()"
              class="w-full bg-gray-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-gray-700 transition duration-200"
            >
              Volver al formulario
            </button>
          </div>
        </div>
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
  `]
})
export class VerDatosComponent implements OnInit {
  id: string = '';
  datos: {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    consiento: boolean;
    aceptoComunicaciones: boolean;
    createdAt: string;
  } | null = null;
  
  cargando = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datosService: DatosService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    
    if (!this.id) {
      this.error = 'No se proporcionó un ID válido';
      this.cargando = false;
      return;
    }

    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.error = '';

    this.datosService.obtenerDatosPorId(this.id).subscribe({
      next: (response: ApiResponse) => {
        this.datos = {
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          telefono: response.data.telefono,
          email: response.data.email,
          consiento: response.data.consiento,
          aceptoComunicaciones: response.data.aceptoComunicaciones,
          createdAt: response.data.createdAt
        };
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.cargando = false;
        
        if (error.status === 404) {
          this.error = 'No se encontró ningún registro con ese ID';
        } else if (error.status === 0) {
          this.error = 'No se pudo conectar con el servidor';
        } else {
          this.error = 'Error al cargar los datos del servidor';
        }
      }
    });
  }

  volverAtras() {
    this.router.navigate(['/']);
  }
}