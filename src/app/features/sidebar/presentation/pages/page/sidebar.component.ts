import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

import { FirstLetterPipe } from "../../components/pipes/fisrt-letter.pipe";

@Component({
  selector    : 'app-sidebar',
  imports     : [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FirstLetterPipe
],
  templateUrl : './sidebar.component.html',
  styleUrl    : './sidebar.component.css',
})
export default class SidebarComponent {
  // #=================== dependencias ===================#
  private readonly router = inject(Router);

  // #=================== variables ===================#
  public fullUserNameLogued:string = '';

  // #=================== ciclo de vida ===================#
  constructor() {
    this.fullUserNameLogued = localStorage.getItem('username') ?? '';
  }
  
  // #=================== funciones ===================#
  closeSession() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}