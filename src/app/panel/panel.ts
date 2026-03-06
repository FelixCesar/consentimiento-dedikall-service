import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientesService, Cliente } from '../services/clientes.service';

@Component({
  selector: 'app-panel',
  imports: [CommonModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel implements OnInit {

  sidebarCollapsed = false;

  clientes: Cliente[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private clientesService: ClientesService
  ) {}

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientesService.getClientes().subscribe((resp:any)=>{
      this.clientes = resp.data;
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