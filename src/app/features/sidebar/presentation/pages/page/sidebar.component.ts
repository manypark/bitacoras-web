import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector    : 'app-sidebar',
  imports     : [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl : './sidebar.component.html',
  styleUrl    : './sidebar.component.css',
})
export default class SidebarComponent { }
