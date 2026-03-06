import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DatosForm {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  consiento: boolean;
  aceptoComunicaciones: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private apiUrl = 'http://localhost:3000/datos';

  constructor(private http: HttpClient) {
    console.log('DatosService inicializado');
  }

  guardarDatos(datos: DatosForm): Observable<any> {
    console.log('Enviando petición POST a:', this.apiUrl);
    console.log('Datos a guardar:', datos);
    
    return this.http.post(this.apiUrl, datos);
  }
}