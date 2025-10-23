import { Component } from '@angular/core';

import { TitleDescriptionCustomButtonComponent } from "@app/shared";
import { CreateTaksComponent } from "../../components/dialogs";

const importsList = [TitleDescriptionCustomButtonComponent, CreateTaksComponent];

@Component({
  selector    : 'app-tasks',
  imports     : [...importsList],
  templateUrl : './tasks.component.html',
  styleUrl    : './tasks.component.css',
})
export default class TasksComponent {

}