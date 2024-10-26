import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { dia, linkTools, shapes } from '@joint/core';
import { ElementsPaletteComponent } from '../../components/elements-palette/elements-palette.component';
import { ModelerCanvasComponent } from '../../components/modeler-canvas/modeler-canvas.component';
import { ModelerPropertiesComponent } from '../../components/modeler-properties/modeler-properties.component';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';

@Component({
  selector: 'app-modeler',
  standalone: true,
  imports: [CommonModule, ElementsPaletteComponent, ModelerCanvasComponent, ModelerPropertiesComponent],
  templateUrl: './modeler.component.html',
  styleUrl: './modeler.component.scss'
})
export class ModelerComponent implements AfterViewInit {
  graph: dia.Graph;
  paper: dia.Paper;
  hideElementTools: Boolean = true;

  constructor(private facadeService: ElementSelectionFacadeService) {

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
  }

  addEventListeners() {
    this.paper.on('element:pointerclick', (elementView) => {
      this.paper.hideTools();
      elementView.showTools();
      // const element = {
      //   elementId: elementView.model.id.toString(),
      //   elementType: elementView.model.attributes['type']
      // }
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