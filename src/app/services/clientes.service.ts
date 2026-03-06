import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'https://consentimiento-dedikall-backend.vercel.app/datos';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}