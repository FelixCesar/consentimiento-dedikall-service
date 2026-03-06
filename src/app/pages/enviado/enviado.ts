import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enviado',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-10 rounded-xl shadow-xl text-center">
        <div class="text-green-500 text-5xl mb-4">✔</div>
        <h1 class="text-2xl font-bold mb-2">Formulario enviado</h1>
        <p class="text-gray-600">
          Tus datos fueron enviados correctamente.
        </p>
      </div>
    </div>
  `
})
export class Enviado {}