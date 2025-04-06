import { Injectable } from '@angular/core';
import { ElementService } from '../elements/element.service';
import { shapes } from '@joint/core';
import { GeneralPropertiesService } from '../elements/general-properties.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessManagerService {

  constructor(
    private elementService: ElementService,
    private generalPropertiesService: GeneralPropertiesService
  ) { }

  public addElementToCanvas(graph, paper, element, position: { x: number, y: number }) {
    let newElement = this.elementService.getElement(element, position);
    graph.addCell(newElement);
    this.elementService.addTools(paper, newElement);
    return newElement.id;
  }

  public addGeneralProperties(generalProperties, formName: string) {
    this.generalPropertiesService.addGeneralProperties(generalProperties, formName);
  }

  public getAndAddElementToCanvas(graph, paper, element, fields) {
    this.elementService.addAdaptElementInGraph(graph, paper, element, fields);
  }

  public addStartAndEndElement(graph, paper, startElement, endElement) {
    startElement = new shapes.standard.Circle();
    startElement.resize(50, 50);
    startElement.attr('label/text', 'Start');
    startElement.prop({'type': 'adaptflow.Start'});
    graph.addCell(startElement);
    this.elementService.addTools(paper, startElement);

    endElement = new shapes.standard.Circle();
    endElement.resize(50, 50);
    endElement.attr('label/text', 'End');
    endElement.prop({'type': 'adaptflow.End'});
    graph.addCell(endElement);
    this.elementService.addTools(paper, endElement);
    this.updateElementPositions(startElement, endElement);
  }

  public updateElementPositions(startElement, endElement) {
    // Get the container dimensions
    const container = document.getElementById('canvasContainer');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    startElement.position(20, containerHeight / 2 - 25);
    endElement.position(containerWidth - 70, containerHeight / 2 - 25);
  }

  public updateElementProperty(graph, elementId: string, propertyName: string, propertyValue: string) {
    graph.getCell(elementId).prop(propertyName, propertyValue);
  }
}
