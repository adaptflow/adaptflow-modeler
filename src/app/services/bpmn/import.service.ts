import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import BpmnModdle from 'bpmn-moddle';
import * as Constants from '../../constants/elements.constant';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  constructor(private sanitizer: DomSanitizer) {}

  async convertToJointJS(xml: string): Promise<any> {
    const moddle = new BpmnModdle();
    const result = await moddle.fromXML(xml);

    const process = result.rootElement.rootElements.find(element => element.$type === 'bpmn:Process');
    if (!process) {
      throw new Error('No process found in BPMN XML.');
    }

    const cells = [];
    const elementMap = {};

    //Map BPMN elements to JointJS cells
    process.flowElements.forEach(element => {
        let type;
        let attrs = {};

        if (element.$type === 'bpmn:StartEvent') {
          type = 'standard.Start';
          attrs = { label: { text: element.name || '' } };
        } else if (element.$type === 'bpmn:EndEvent') {
          type = 'standard.End';
          attrs = { label: { text: element.name || '' } };
        } else if (element.$type === 'bpmn:Task') {
          type = Constants.ELEMENT_TYPE_LLM_PROVIDER; // Assuming this constant exists
          attrs = { label: { text: element.name || '' } };
        } else if (element.$type === 'bpmn:SequenceFlow'){
          //Skip sequence flows for now
          return;
        } else {
          console.warn(`Unsupported element type: ${element.$type}`);
          return;
        }

        const bpmnDiElement = this.findDiElement(result, element.id);
        const position = bpmnDiElement?.bounds ? {x: bpmnDiElement.bounds.x, y: bpmnDiElement.bounds.y} : {x: 0, y: 0};
        const size = bpmnDiElement?.bounds ? {width: bpmnDiElement.bounds.width, height: bpmnDiElement.bounds.height} : {width: 50, height: 50};


        cells.push({
            type,
            position,
            size,
            angle: 0,
            id: element.id,
            z: cells.length + 1,
            attrs
        });
        elementMap[element.id] = cells[cells.length-1];
    });


    // Add links
    process.flowElements.forEach(element => {
        if (element.$type === 'bpmn:SequenceFlow') {
            cells.push({
                type: 'standard.Link',
                source: { id: element.sourceRef },
                target: { id: element.targetRef },
                id: element.id,
                z: cells.length + 1,
                attrs: {}
            })
        }
    })
    console.log("JointJS: \n" + JSON.stringify(cells));
    return { cells };
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
}
