import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-ver-datos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 relative">

      <!-- LOADER -->
      @if (cargando) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 flex items-center">
            <svg class="animate-spin h-8 w-8 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span>Cargando datos...</span>
          </div>
        </div>
      }

      <!-- ERROR -->
      @if (error) {
        <div class="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 class="text-lg font-medium text-red-800 mb-2">Error</h3>
          <p class="text-red-600 mb-4">{{ error }}</p>

          <button
            (click)="volverAtras()"
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Volver
          </button>
        </div>
      }

      <!-- DATOS -->
      @if (!cargando && !error && datos) {

        <div class="max-w-3xl mx-auto">

          <div class="text-center mb-8">

            <img
              src="ddk.png"
              alt="Synergy Telecom"
              class="h-56 mx-auto">

            <div class="mt-4 inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <span class="font-medium">Vista de solo lectura</span>
            </div>

          </div>

          <p class="text-center text-gray-600 mb-8">
            Registro ID:
            <span class="font-mono bg-gray-100 px-2 py-1 rounded">
              {{ id }}
            </span>
          </p>

          <div class="bg-white shadow-xl rounded-lg p-8 space-y-6">

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>

              <input
                type="text"
                [value]="datos.nombre"
                readonly
                disabled
                class="w-full px-4 py-3 border rounded-lg bg-gray-100">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Apellido
              </label>

              <input
                type="text"
                [value]="datos.apellido"
                readonly
                disabled
                class="w-full px-4 py-3 border rounded-lg bg-gray-100">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>

              <input
                type="text"
                [value]="datos.telefono"
                readonly
                disabled
                class="w-full px-4 py-3 border rounded-lg bg-gray-100">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="text"
                [value]="datos.email"
                readonly
                disabled
                class="w-full px-4 py-3 border rounded-lg bg-gray-100">
            </div>

            <div class="pt-4 border-t text-sm text-gray-500">
              Fecha registro:
              {{ datos.createdAt | date:'dd/MM/yyyy HH:mm' }}
            </div>

            <button
              (click)="volverAtras()"
              class="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700">
              Volver
            </button>

          </div>

        </div>

      }

    </div>
  `
})
export class VerDatosComponent implements OnInit {

  id = '';
  datos: any = null;

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
      this.error = 'ID inválido';
      this.cargando = false;
      return;
    }

    this.cargarDatos();

  }

  cargarDatos() {

    this.cargando = true;

    this.datosService.obtenerDatosPorId(this.id).subscribe({

      next: (response: any) => {

        console.log("RESPUESTA API:", response);

        this.datos = response.data;

        this.cargando = false;

      },

      error: (err) => {

        console.error(err);

        this.error = 'No se pudieron cargar los datos';

        this.cargando = false;

      }

    });

  }

  volverAtras() {
    this.router.navigate(['/']);
  }

}