import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { dia, V } from '@joint/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';
import { take } from 'rxjs';
import { ExportService } from '../../services/bpmn/export.service';
import { AdaptflowService } from '../../services/rest/adaptflow.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'top-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, TooltipModule, ToastModule],
  providers: [MessageService],
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.scss',
})
export class TopToolbarComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input()
  graph: dia.Graph;
  @Input()
  paper: dia.Paper;

  private dragStartPosition: { x: number; y: number } | null = null;
  private isPanning: boolean = false;
  private handleMouseMove: (event: MouseEvent) => void;
  private initialPaperPosition: { tx: number; ty: number } = { tx: 0, ty: 0 }; // Store the initial position
  private currentScale: { sx: number; sy: number } = { sx: 1, sy: 1 };

  constructor(
    private _router: Router,
    private facadeService: ElementSelectionFacadeService,
    private cdr: ChangeDetectorRef,
    private exportService: ExportService,
    private adaptflowService: AdaptflowService,
    private messageService: MessageService
  ) {
    this.handleMouseMove = this.onMouseMove.bind(this);
  }

  ngOnInit(): void {
    // this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    // this.setupPanning();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graph']) {
      // this.cdr.detectChanges();
      // Handle changes to 'graph' here if needed
      console.log('Graph changed', this.graph);
    }
    if (changes['paper'] && this.paper) {
      this.setupPanning();
      this.storeInitialPaperPosition(); // Store the initial position when the paper is available
      this.currentScale = this.paper.scale();
    }
  }

  zoomIn() {
    if (this.graph) {
      this.currentScale = this.paper.scale();
      this.paper.scale(this.currentScale.sx + 0.1, this.currentScale.sy + 0.1);
      this.currentScale = this.paper.scale();
    }
  }

  zoomOut() {
    if (this.graph) {
      this.currentScale = this.paper.scale();
      this.paper.scale(this.currentScale.sx - 0.1, this.currentScale.sy - 0.1);
      this.currentScale = this.paper.scale();
    }
  }

  async save() {
    console.log('Save clicked');
    let graphJson = this.graph.toJSON();
    this.facadeService.selectedElement$.pipe(take(1)).subscribe((elementSelection) => {
      const processName = elementSelection.generalProperties.find(property=>property.name=="Process Name").value;
      const processId = elementSelection.generalProperties.find(property=>property.name=="Process Name").id;
      const bpmnXml = this.exportService.convertToBpmnXML(graphJson, processId, processName);
      bpmnXml.then((xml) => {
        const processDefinition = {
          bpmnXml: xml,
          fields: elementSelection.elements,
          generalProperties: elementSelection.generalProperties
        }
        this.adaptflowService.saveProcessDefinition(processDefinition).subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Process definition saved successfully' });
            this.graph.clear();
            this.facadeService.onInitialState();
            this._router.navigateByUrl('/modeler/' + response['processId']).then(() => {
              window.location.reload();
            });
            window.location.reload();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error saving process definition', detail: error });
          }
        });
      });
    });
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

  private setupPanning() {
    if (!this.paper) return;

    this.paper.on('blank:pointerdown', (event, x, y) => {
      this.currentScale = this.paper.scale();
      this.dragStartPosition = { x: x * this.currentScale.sx, y: y * this.currentScale.sy };
      this.isPanning = true;
      this.paper.el.style.cursor = 'grabbing';
      document.addEventListener('mousemove', this.handleMouseMove);
    });

    this.paper.on('cell:pointerup blank:pointerup', () => {
      this.dragStartPosition = null;
      this.isPanning = false;
      this.paper.el.style.cursor = 'default';
      document.removeEventListener('mousemove', this.handleMouseMove);
    });

    this.paper.on('cell:pointerdown', () => {
      this.isPanning = false;
      this.paper.el.style.cursor = 'default';
      document.removeEventListener('mousemove', this.handleMouseMove);
    });
  }

  private onMouseMove(event: MouseEvent) {
    if (this.dragStartPosition && this.isPanning) {
      const dx = event.offsetX;
      const dy = event.offsetY;
      const scaledX = dx / this.currentScale.sx;
      const scaledY = dy / this.currentScale.sy;

      this.paper.translate(
        scaledX - this.dragStartPosition.x / this.currentScale.sx,
        scaledY - this.dragStartPosition.y / this.currentScale.sy
      );
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  private storeInitialPaperPosition() {
    // Get the current translation of the paper
    const currentTranslation = this.paper.translate();
    this.initialPaperPosition = { tx: currentTranslation.tx, ty: currentTranslation.ty };
  }

  resetPaperPosition() {
    // Reset the paper's translation to the initial position
    this.paper.translate(this.initialPaperPosition.tx, this.initialPaperPosition.ty);
    this.paper.scale(1,1);
    this.currentScale = {sx:1, sy:1};
  }
}
