import { Component, Input } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { Project } from '../../../interface/project.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'tile',
  standalone: true,
  imports: [ CommonModule, PanelModule, RippleModule ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @Input() project!: Project;

  constructor(private router: Router) {}

  openModeler(projectId: string) {
    this.router.navigate(['/modeler', projectId]);
  }
}
