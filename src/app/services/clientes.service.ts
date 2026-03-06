// En clientes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Cliente {
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

export interface ApiResponse {
  count: number;
  data: Cliente[];
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'https://consentimiento-dedikall-backend.vercel.app/datos';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}