import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dia, elementTools } from '@joint/core';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ElementType } from '../../interface/palette.interface';
import { ElementListService } from '../../services/elements/element-list.service';
import { ElementService } from '../../services/elements/element.service';

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
    private elementService: ElementService
  ) {

  }
  ngOnInit() {
    this.elementTypes = this.elementList.get()
    this.updateFilteredItems();
  }

  onDrop(event): void {
    const dropPosition = this.getMousePositionOnCanvas(event.event);
    // Add shape to canvas based on the dropped element
    this.addElementToCanvas(event.container.data[event.currentIndex].name, dropPosition);
    this.paper.hideTools();
  }

  private addElementToCanvas(elementName: string, position: { x: number, y: number }) {
    const target = this.paper.el.getBoundingClientRect();
    let newElement = this.elementService.getElement(elementName, position);
    // Add the element to the graph
    this.graph.addCell(newElement);

    //on hover add boundry and rmove button
    let boundaryTool = new elementTools.Boundary({
      rotate: true,
      useModelGeometry: true,
    });
    let removeElementButton = new elementTools.Remove();
    let connectbutton = new elementTools.Connect({
      rotate: true,
      useModelGeometry: true,
      x: '100%',
      y: '50%'
    });
    let toolsView = new dia.ToolsView({
        tools: [
            removeElementButton,
            connectbutton,
            boundaryTool
        ]
    });
    newElement.findView(this.paper).addTools(toolsView);
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
}

