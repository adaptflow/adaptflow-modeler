import { Component, Input } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { Project } from '../../../interface/project.interface';
import { CommonModule, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { AdaptflowService } from '../../../services/rest/adaptflow.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'tile',
  standalone: true,
  imports: [ CommonModule, PanelModule, RippleModule, TooltipModule, ToastModule ],
  providers: [MessageService],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @Input() project!: Project;

  constructor(
    private router: Router,
    private adaptflowService: AdaptflowService,
    private messageService: MessageService
  ) {}

  openModeler(processId: string) {
    this.router.navigate(['/modeler', processId]);
  }

  formatProjectDate(date) {
    return formatDate(date, 'short', 'en-US')
  }

  deleteProject(processId: string) {
    this.adaptflowService.deleteProcessDefinition(processId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Process definition deleted successfully' });
        window.location.reload();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error deleting process definition', detail: error });
      }
    });
  }
}
