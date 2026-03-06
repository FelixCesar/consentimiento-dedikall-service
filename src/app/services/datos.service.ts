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

export interface ApiResponse {
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

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  guardarDatos(datos: DatosForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/datos`, datos);
  }

  obtenerDatosPorId(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/datos/${id}`);
  }
}