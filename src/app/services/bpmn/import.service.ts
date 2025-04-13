import { Injectable } from '@angular/core';
import BpmnModdle from 'bpmn-moddle';
import * as Constants from '../../constants/elements.constant';
import { ProcessManagerService } from './process-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  constructor(private processManagerService: ProcessManagerService) { }

  async import(graph, paper, xml: string, fields, generalProperties): Promise<any> {
    this.processManagerService.addGeneralProperties(generalProperties, null);
    const moddle = new BpmnModdle();
    const result = await moddle.fromXML(xml);

    const process = result.rootElement.rootElements.find(element => element.$type === 'bpmn:Process');
    if (!process) {
      throw new Error('No process found in BPMN XML.');
    }

    //Map BPMN elements to JointJS cells
    process.flowElements.forEach(element => {
      element.id = element.id.replace(/^af-/, '');
      let elementAttributes = { id: element.id };

      if (element.$type === 'bpmn:StartEvent' || element.$type === 'bpmn:EndEvent') {
        elementAttributes['type'] = element.$type;
        elementAttributes['name'] = element.name;
      } else if (element.$type === 'bpmn:ServiceTask') {
        elementAttributes['type'] = element.$type;
        elementAttributes['name'] = element.name;
        elementAttributes['taskType'] = this.findTaskType(element);
      }
      else if (element.$type === 'bpmn:SequenceFlow') {
        return;
      } else {
        console.warn(`Unsupported element type: ${element.$type}`);
        return;
      }

      const bpmnDiElement = this.findDiElement(result, element.id);
      const position = bpmnDiElement?.bounds ? { x: bpmnDiElement.bounds.x, y: bpmnDiElement.bounds.y } : { x: 0, y: 0 };
      const size = bpmnDiElement?.bounds ? { width: bpmnDiElement.bounds.width, height: bpmnDiElement.bounds.height } : { width: 50, height: 50 };

      elementAttributes['position'] = position;
      elementAttributes['size'] = size;
      let fieldByElementId = fields[element.id]
      if(fieldByElementId) {
        this.processManagerService.getAndAddElementToCanvas(graph, paper, elementAttributes, fieldByElementId);
      } else {
        this.processManagerService.getAndAddElementToCanvas(graph, paper, elementAttributes, null);
      }
    });


    // Add links
    process.flowElements.forEach(element => {
      if (element.$type === 'bpmn:SequenceFlow') {
        let elementAttributes = { id: element.id };
        elementAttributes['type'] = element.$type;
        elementAttributes['source'] = { id: element.sourceRef.id };
        elementAttributes['target'] = { id: element.targetRef.id };
        this.processManagerService.getAndAddElementToCanvas(graph, paper, elementAttributes, null);
      }
    });
    paper.hideTools();
  }

  private findDiElement(definitions: any, elementId: string) {
    const diagram = definitions.rootElement.diagrams.find((element) => element.$type === 'bpmndi:BPMNDiagram');
    if (diagram) {
      const plane = diagram.plane;
      const shapeOrEdge = plane.planeElement.find((element: any) => element.bpmnElement.id === elementId);
      return shapeOrEdge;
    }
    return null;
  }

  private findTaskType(element) {
    let taskDefinition = element.extensionElements.values.find(extension => extension.$type === "adaptflow:taskDefinition")
    if(taskDefinition) {
      return taskDefinition.type;
    }
  }
}
