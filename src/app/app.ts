import { NgxSonnerToaster } from 'ngx-sonner';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector    : 'app-root',
  imports     : [RouterOutlet, NgxSonnerToaster],
  templateUrl : './app.html',
})
export class App {
  protected title = 'bitacoras-web';
}