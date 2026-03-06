import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-panel',
  imports: [CommonModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {

  sidebarCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  
}
