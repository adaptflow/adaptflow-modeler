import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { dia, linkTools, shapes } from '@joint/core';
import { ElementsPaletteComponent } from '../../components/modeler/elements-palette/elements-palette.component';
import { ModelerCanvasComponent } from '../../components/modeler/modeler-canvas/modeler-canvas.component';
import { ModelerPropertiesComponent } from '../../components/modeler/modeler-properties/modeler-properties.component';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';
import * as _ from 'lodash';
import { ElementService } from '../../services/elements/element.service';
import { TopToolbarComponent } from "../../components/top-toolbar/top-toolbar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-modeler',
  standalone: true,
  imports: [CommonModule, ElementsPaletteComponent, ModelerCanvasComponent, ModelerPropertiesComponent, TopToolbarComponent, NavbarComponent],
  templateUrl: './modeler.component.html',
  styleUrl: './modeler.component.scss'
})
export class ModelerComponent implements AfterViewInit {
  graph: dia.Graph;
  paper: dia.Paper;
  hideElementTools: Boolean = true;
  startElement;
  endElement;

  constructor(
    private facadeService: ElementSelectionFacadeService,
    private elementService: ElementService) {

  }

  ngAfterViewInit(): void {
    this.graph = new dia.Graph({}, { cellNamespace: shapes });
    this.paper = new dia.Paper({
      el: document.getElementById('canvasContainer'),
      model: this.graph,
      width: "100%",
      height: "100%",
      gridSize: 1,
      drawGrid: true,
      cellViewNamespace: shapes,
      defaultLink: () => new shapes.standard.Link(),
      linkPinning: false,
      defaultConnector: {
        name: "curve"
      }
    });
    this.addEventListeners();
    this.addStartAndEndElement();
    window.addEventListener('resize', () => this.updateElementPositions());
    this.paper.hideTools();
  }

  addStartAndEndElement() {
    this.startElement = new shapes.standard.Circle();
    this.startElement.resize(50, 50);
    this.startElement.attr('root/title', 'shapes.standard.Circle');
    this.startElement.attr('label/text', 'Start');
    this.graph.addCell(this.startElement);
    this.elementService.addTools(this.paper, this.startElement);

    this.endElement = new shapes.standard.Circle();
    this.endElement.resize(50, 50);
    this.endElement.attr('label/text', 'End');
    this.graph.addCell(this.endElement);
    this.elementService.addTools(this.paper, this.endElement);
    this.updateElementPositions();

  }

  updateElementPositions() {
    // Get the container dimensions
    const container = document.getElementById('canvasContainer');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    this.startElement.position(20, containerHeight / 2 - 25);
    this.endElement.position(containerWidth - 70, containerHeight / 2 - 25);
  }


  addEventListeners() {
    this.paper.on('element:pointerclick', (elementView) => {
      this.paper.hideTools();
      elementView.showTools();
      this.facadeService.onSelected(elementView.model.id.toString());
    });

    //Hide all tools on blank canvas click
    this.paper.on('blank:pointerdown', (evt, x, y) => {
      this.paper.hideTools();
      this.hideElementTools = true;
      this.facadeService.onDeselection();
    });

    this.paper.on('link:connect', (evt, x, y) => {
      this.paper.hideTools();
      this.hideElementTools = true;
    });

    this.paper.on('link:disconnect', (evt, x, y) => {
      this.paper.hideTools();
      this.hideElementTools = true;
    });

    this.paper.on('link:mouseenter', function(linkView) {
      let removeLinkButton = new linkTools.Remove();
      let toolsView = new dia.ToolsView({
        tools: [removeLinkButton]
      });
      linkView.addTools(toolsView);
    });

    this.paper.on('link:mouseleave', function(linkView) {
      linkView.removeTools();
    });

    this.graph.on('remove', (element, collection, options) => {
      this.facadeService.onDeselection();
      this.facadeService.onRemove(element.id);
    });
  }
}