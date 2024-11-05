import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'top-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, TooltipModule],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss'
})
export class TopToolbarComponent {

  constructor(private _router: Router) { }

  zoomIn() {
    console.log('Zoom In clicked');
    // Implement zoom in logic
  }

  zoomOut() {
    console.log('Zoom Out clicked');
    // Implement zoom out logic
  }

  save() {
    console.log('Save clicked');
    // Implement save logic
  }

  run() {
    console.log('Run clicked');
    // Implement run logic
  }

  export() {
    console.log('Export clicked');
    // Implement export logic
  }

  cancel() {
    this._router.navigateByUrl('/workspace');
  }
}
