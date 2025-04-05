import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ProjectListComponent } from '../../components/workspace/project-list/project-list.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [ NavbarComponent, ProjectListComponent, ButtonModule, RippleModule],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
  constructor(private router: Router) {}

  createNewProject() {
    this.router.navigate(['/modeler']); 
  }
}