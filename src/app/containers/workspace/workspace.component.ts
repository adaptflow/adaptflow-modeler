import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ProjectListComponent } from '../../components/workspace/project-list/project-list.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [ NavbarComponent, ProjectListComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {

}
