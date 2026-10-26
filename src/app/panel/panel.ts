import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientesService, Cliente } from '../services/clientes.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel implements OnInit {

  sidebarCollapsed = false;

  clientes: Cliente[] = [];
  cargando = true;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private clientesService: ClientesService
  ) {}

  ngOnInit() {
    this.obtenerClientes();
  }

obtenerClientes() {
  this.cargando = true;
  this.error = '';
  this.clientesService.getClientes().subscribe({
    next: (res) => {
      this.clientes = res.data;
      this.cargando = false;
    },
    error: (error) => {
      this.cargando = false;
      this.error = 'No se pudieron cargar los clientes. Inténtalo de nuevo.';
    }
  });
}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
