import { Injectable } from '@angular/core';
import BpmnModdle from 'bpmn-moddle';
import * as Constants from '../../constants/elements.constant';
import { ImportService } from './import.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private importService:ImportService) { }

  convertToBpmnXML(jointjsDiagramJSON) {
    const process = this.mapJointJSToBPMN(jointjsDiagramJSON);
    let moddle = new BpmnModdle();

    const xmlObject = this.convertToXml(moddle, process).then(res => {
      console.log("xml:\n", res);
      return res;
    });
  }

  private async convertToXml(moddle, definitions) {
    return await moddle.toXML(definitions, { format: true });
  }

  private mapJointJSToBPMN(jointjsDiagramJSON) {
    let adaptFlowNs = 'http://adaptflow.org/schema/1.0/bpmn';
    const bpmnElements = [];
    const bpmnFlows = [];
    const elementMap = {};
    const moddle = new BpmnModdle();

    const process = moddle.create('bpmn:Process', { id: 'Process_1', name: "My Process" });
    const bpmnDiagram = moddle.create('bpmndi:BPMNDiagram', {
      id: 'BPMNDiagram_1',
      plane: moddle.create('bpmndi:BPMNPlane', {
        id: 'BPMNPlane_1',
        bpmnElement: process
      }),
    });

    jointjsDiagramJSON.cells.forEach(cell => {
      let bpmnElement;
      let bpmndiElement;

      if (cell.type === 'adaptflow.Start') {
        bpmnElement = moddle.create('bpmn:StartEvent', { id: 'af-' + cell.id, name: cell.attrs.label.text });
      } else if (cell.type === 'adaptflow.End') {
        bpmnElement = moddle.create('bpmn:EndEvent', { id: 'af-' + cell.id, name: cell.attrs.label.text });
      } else if (cell.type === Constants.ELEMENT_TYPE_LLM_PROVIDER) {
        bpmnElement = moddle.create('bpmn:ServiceTask', { id: 'af-' + cell.id, name: cell.attrs.label.text,
          'activiti:class':"com.adaptflow.af_serverj.features.llm.LLMProviderDelegate"
         });
        bpmnElement.extensionElements = moddle.create('bpmn:ExtensionElements');
        var inputParameter = moddle.createAny('activiti:string', adaptFlowNs, {
          $body: '<![CDATA[openai-key-id]]>'
        });
        bpmnElement.extensionElements.values = [
          moddle.createAny('activiti:field', adaptFlowNs, {
            name: 'credentialId',
            $children: [
              inputParameter
            ]
          })
        ];
      } else if (cell.type === 'standard.Link') {
        const sourceElement = elementMap['af-' + cell.source.id];
        const targetElement = elementMap['af-' + cell.target.id];

        if (sourceElement && targetElement) {
          const sequenceFlow = moddle.create('bpmn:SequenceFlow', {
            id: 'af-' + cell.id,
            sourceRef: sourceElement,
            targetRef: targetElement
          });
          bpmnFlows.push(sequenceFlow);
          bpmnDiagram.get('plane').get('planeElement').push(this.createBPMNDISequenceFlow(moddle, jointjsDiagramJSON, sequenceFlow, sourceElement.id, targetElement.id));
          sourceElement.outgoing = sourceElement.outgoing || [];
          sourceElement.outgoing.push(sequenceFlow);
          targetElement.incoming = targetElement.incoming || [];
          targetElement.incoming.push(sequenceFlow);
          return;
        }
        return;
      }

      if (bpmnElement) {
        bpmnElements.push(bpmnElement);
        elementMap['af-' + cell.id] = bpmnElement;
        bpmndiElement = this.createBPMNDIShape(moddle, cell, bpmnElement);
        if (bpmndiElement) {
          bpmnDiagram.get('plane').get('planeElement').push(bpmndiElement);
        }
      }
    });


    process.flowElements = [...bpmnElements, ...bpmnFlows];

    const definitions = moddle.create('bpmn:Definitions', {
      targetNamespace: 'http://adaptflow.io/schema/bpmn',
      rootElements: [process, bpmnDiagram],
      exporter: 'AdaptFlow Modeler',
      id: 'Definitions_' + Date.now()
    });

    return definitions;
  }

  private createBPMNDIShape(moddle, cell, bpmnElement) {
    return moddle.create('bpmndi:BPMNShape', {
      id: `BPMNShape_${bpmnElement.id}`,
      bpmnElement: bpmnElement,
      bounds: moddle.create('dc:Bounds', {
        x: cell.position.x,
        y: cell.position.y,
        width: cell.size.width,
        height: cell.size.height,
      })
    });
  }

  private createBPMNDISequenceFlow(moddle, jointjsDiagramJSON, sequenceFlow, sourceId, targetId) {
    const sourcePos = this.findPositionById(jointjsDiagramJSON, sourceId);
    const targetPos = this.findPositionById(jointjsDiagramJSON, targetId);

    if (!sourcePos || !targetPos) {
      console.error("Error creating BPMN DI for sequence flow: source or target position not found.");
      return null; //Or handle the error appropriately.
    }

    return moddle.create('bpmndi:BPMNEdge', {
      id: `BPMNEdge_${sequenceFlow.id}`,
      bpmnElement: sequenceFlow,
      waypoint: [
        moddle.create('dc:Point', { x: sourcePos.x + sourcePos.width, y: sourcePos.y + sourcePos.height / 2 }),
        moddle.create('dc:Point', { x: targetPos.x, y: targetPos.y + targetPos.height / 2 })
      ]
    });
  }

  private findPositionById(jointjsDiagramJSON: any, id: string) {
    const cell = jointjsDiagramJSON.cells.find(c => 'af-' + c.id === id);
    if (cell) {
      return {
        x: cell.position.x,
        y: cell.position.y,
        width: cell.size.width,
        height: cell.size.height
      };
    } else {
      return null;
    }
  }
}
