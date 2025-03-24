import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { dia } from '@joint/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';
import { take } from 'rxjs';
import { ExportService } from '../../services/bpmn/export.service';

@Component({
  selector: 'top-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, TooltipModule],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss'
})
export class TopToolbarComponent implements OnInit, OnChanges {
  @Input()
  graph: dia.Graph;

  constructor(private _router: Router,
    private facadeService: ElementSelectionFacadeService,
    private cdr: ChangeDetectorRef,
    private exportService: ExportService
  ) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graph']) {
      this.cdr.detectChanges();
      // Handle changes to 'graph' here if needed
      console.log('Graph changed', this.graph);
    }
  }

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
    let graphJson = this.graph.toJSON();
    this.facadeService.selectedElement$.pipe(take(1)).subscribe((elementSelection) => {
      console.log('graphJson:\n', graphJson);
      console.log('elementSelections:\n', elementSelection);
      console.log('BPMN modeL: \n', this.exportService.convertToBpmnXML(graphJson));
    });
    // Implement save logic
  }

  run() {
    console.log('Run clicked');
    // Implement run logic
  }

  export() {
    console.log('Export clicked');
  }

  cancel() {
    this._router.navigateByUrl('/workspace');
  }
}
