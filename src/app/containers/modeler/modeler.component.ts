import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { dia, linkTools, shapes } from '@joint/core';
import { ElementsPaletteComponent } from '../../components/modeler/elements-palette/elements-palette.component';
import { ModelerCanvasComponent } from '../../components/modeler/modeler-canvas/modeler-canvas.component';
import { ModelerPropertiesComponent } from '../../components/modeler/modeler-properties/modeler-properties.component';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';
import * as _ from 'lodash';
import { TopToolbarComponent } from "../../components/top-toolbar/top-toolbar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { AdaptflowService } from '../../services/rest/adaptflow.service';
import { ImportService } from '../../services/bpmn/import.service';
import { ProcessManagerService } from '../../services/bpmn/process-manager.service';
import { forkJoin } from 'rxjs';
import { TabView } from 'primeng/tabview';

@Component({
  selector: 'app-modeler',
  standalone: true,
  imports: [CommonModule, ElementsPaletteComponent, ModelerCanvasComponent, ModelerPropertiesComponent, TopToolbarComponent, NavbarComponent],
  templateUrl: './modeler.component.html',
  styleUrl: './modeler.component.scss'
})
export class ModelerComponent implements OnInit {
  graph: dia.Graph;
  paper: dia.Paper;
  hideElementTools: Boolean = true;
  startElement;
  endElement;
  processId!: string;
  @ViewChild(ModelerPropertiesComponent) modelerPropertiesComponent: ModelerPropertiesComponent;

  constructor(
    private facadeService: ElementSelectionFacadeService,
    private route: ActivatedRoute,
    private adaptflowService: AdaptflowService,
    private processManagerService: ProcessManagerService,
    private importService: ImportService) {
      this.route.params.subscribe(params => {
        this.processId = params['processId'];
      });

  }

  ngOnInit(): void {
    this.graph = new dia.Graph({}, { cellNamespace: shapes });
    this.paper = new dia.Paper({
      el: document.getElementById('canvasContainer'),
      model: this.graph,
      width: "100%",
      height: "100%",
      gridSize: 20,
      drawGrid: {
        name: 'dot',
        args: [
            { color: 'black', thickness: 2 }, // settings for the primary mesh
      ]},
      background: { color: '#F5F5F5' },
      cellViewNamespace: shapes,
      defaultLink: () => new shapes.standard.Link(),
      defaultRouter: { name: 'manhattan' },
      linkPinning: false
    });
    this.addEventListeners();
    if(this.processId==null) {
      this.processManagerService.addStartAndEndElement(this.graph, this.paper, this.startElement, this.endElement);
      window.addEventListener('resize', () => this.processManagerService.updateElementPositions(this.startElement, this.endElement));
      this.processManagerService.addDefaultGeneralProperties();
    } else {
      this.loadProcess();
    }
    this.paper.hideTools();
  }

  loadProcess() {
    this.adaptflowService.getProcessDefinition(this.processId).subscribe(processDefinition => {
      this.importService.import(this.graph, this.paper, processDefinition.bpmnXml, JSON.parse(processDefinition.fields), JSON.parse(processDefinition.generalProperties)).then(() => {
        console.log("Import successful!");
      });
    });
  }

  addEventListeners() {
    this.paper.on('element:pointerclick', (elementView) => {
      this.paper.hideTools();
      elementView.showTools();
      this.facadeService.onSelected(elementView.model.id.toString());
      // Select the second tab (index 1) in ModelerPropertiesComponent
      // if (this.modelerPropertiesComponent && this.modelerPropertiesComponent.tabView) {
      //   this.modelerPropertiesComponent.tabView.activeIndex = 1;
      // }
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
