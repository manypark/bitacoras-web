import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FirstLetterPipe } from "../../components/pipes/fisrt-letter.pipe";

@Component({
  selector    : 'app-sidebar',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FirstLetterPipe
],
  templateUrl : './sidebar.component.html',
  styleUrl    : './sidebar.component.css',
})
export default class SidebarComponent {

  public fullUserNameLogued:string = '';
  
  constructor( ) {
    this.fullUserNameLogued = localStorage.getItem('username') ?? '';
  }
  
}