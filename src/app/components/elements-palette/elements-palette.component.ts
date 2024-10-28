import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dia } from '@joint/core';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ElementType } from '../../interface/palette.interface';
import { ElementListService } from '../../services/elements/element-list.service';
import { ElementService } from '../../services/elements/element.service';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'elements-palette',
  standalone: true,
  imports: [CommonModule, DragDropModule, AccordionModule, InputTextModule, FormsModule],
  templateUrl: './elements-palette.component.html',
  styleUrl: './elements-palette.component.scss'
})
export class ElementsPaletteComponent implements OnInit {
  @Input()
  paper: dia.Paper;
  @Input()
  graph: dia.Graph;

  searchTerm: string = '';
  filteredItems: ElementType[] = [];
  elementTypes: ElementType[] = [];

  constructor(
    private elementList: ElementListService,
    private elementService: ElementService,
    private facadeService: ElementSelectionFacadeService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {

  }
  ngOnInit() {
    this.elementTypes = this.elementList.get();
    this.updateFilteredItems();
  }

  onDrop(event): void {
    this.cdr.detectChanges();
    const dropPosition = this.getMousePositionOnCanvas(event.event);
    // Add shape to canvas based on the dropped element
    let droppedElement = event.container.data[event.currentIndex];
    let elementId = this.addElementToCanvas(droppedElement, dropPosition);
    this.facadeService.onDeselection();
    this.facadeService.onDropped(elementId, droppedElement.type);
    this.paper.hideTools();
    this.cdr.detectChanges();
  }

  private addElementToCanvas(element, position: { x: number, y: number }) {
    const target = this.paper.el.getBoundingClientRect();
    let newElement = this.elementService.getElement(element, position);
    // Add the element to the graph
    this.graph.addCell(newElement);
    this.elementService.addTools(this.paper, newElement);
    return newElement.id;
  }

  // Get mouse position relative to canvas
  private getMousePositionOnCanvas(event: MouseEvent): { x: number; y: number } {
    const canvasElement = document.getElementById('canvasContainer');
    const rect = canvasElement.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  updateFilteredItems() {
    this.filteredItems = this.elementTypes
      .map(type => ({
        ...type,
        elements: type.elements.filter(element =>
          element.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ),
      }))
      .filter(type => type.elements.length > 0);
  }

  onSearchChange() {
    this.updateFilteredItems();
  }

  getSvg(element) {
    if(element.shape=='af.polygon') {
      return this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="80" height="80">
        <polygon joint-selector="body" id="v-4" points="0,35 35,0 70,35 35,70" stroke-width="2" stroke="#333333" fill="#FFFFFF"></polygon>
        <text fill="#000" font-size="10" font-family="Verdana" x="10" y="38">${element.name}</text>
      </svg>
      `);
    }
    return null;  
  }
}

