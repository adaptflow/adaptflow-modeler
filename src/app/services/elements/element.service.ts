import { Injectable } from '@angular/core';
import { dia, elementTools, shapes, util } from '@joint/core';
import * as Constants from '../../constants/elements.constant';
import { ElementInstanceService } from './element-instance.service';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
    constructor(
        private elementInstanceService: ElementInstanceService,
        private facadeService: ElementSelectionFacadeService
    ) { }

    public getElement(element, position) {
        let newElement;
        if(element.type=='af.standard') {
            if(element.shape=='af.polygon') {
                newElement = new shapes.standard.Polygon();
                newElement.resize(80, 80);
                newElement.attr('root/title', 'shapes.standard.Polygon');
                newElement.attr('label/text', element.name);
                newElement.attr('body/refPoints', '0,10 10,0 20,10 10,20');   
            }
        }
        else {
            newElement = new Node({
                attrs: ({
                    label: {
                        text: element.name,
                    }
                })
            });
            newElement.resize(150, 50);
            newElement.prop({'type': element.type});
        }
        newElement.position(position.x, position.y);
        return newElement;
    }

    public addAdaptElementInGraph(graph, paper, element, fields) {
        if(element['type'] == 'bpmn:StartEvent') {
            let adaptElement = new Start({id: element['id']});
            adaptElement.resize(50, 50);
            adaptElement.attr('label/text', element['name']);
            adaptElement.prop({'type': 'adaptflow.Start'});
            adaptElement.position(element['position'].x, element['position'].y);
            graph.addCell(adaptElement);
            this.addTools(paper, adaptElement);
            return;
        }
        if(element['type'] == 'bpmn:EndEvent') {
            let adaptElement = new End({id: element['id']});
            adaptElement.resize(50, 50);
            adaptElement.attr('label/text', element['name']);
            adaptElement.prop({'type': 'adaptflow.End'});
            adaptElement.position(element['position'].x, element['position'].y);
            graph.addCell(adaptElement);
            this.addTools(paper, adaptElement);
            return;
        }
        if(element['type'] == 'bpmn:ServiceTask') {
            let adaptElement = new Node({id: element['id']});
            adaptElement.attr('label/text', element['name']);
            adaptElement.prop({'type': element['taskType']});
            adaptElement.position(element['position'].x, element['position'].y);
            graph.addCell(adaptElement);
            this.addTools(paper, adaptElement);
            this.facadeService.onElementImport(element['id'], fields);
            return;
        }
        if(element['type'] == 'bpmn:SequenceFlow') {
            let adaptLink = new shapes.standard.Link({id: element['id']});
            adaptLink.source(element['source']);
            adaptLink.target(element['target']);
            adaptLink.addTo(graph);
            return;
        }
    }

    public addTools(paper, element) {
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
        element.findView(paper).addTools(toolsView);
    }
}

class ForeignObjectElement extends dia.Element {

    override defaults() {
        return {
            ...super.defaults,
            attrs: {
                body: {
                    rx: 10,
                    ry: 10,
                    width: 'calc(w)',
                    height: 'calc(h)',
                    fill: '#fff',
                },
                foreignObject: {
                    width: 'calc(w)',
                    height: 'calc(h)'
                },
                label: {
                    fill: 'black',
                    textWrap: {
                        width: "1"
                    }
                },
            }
        };
    }
}

export class Node extends ForeignObjectElement {
    override defaults() {
        return {
            ...super.defaults(),
            type: 'af.Node',
            size: {
                width: 200,
                height: 50
            }
        };
    }

    override preinitialize() {
        this.markup = util.svg/* xml */`
            <rect @selector="body" />
            <foreignObject @selector="foreignObject" overflow="hidden" style="vertical-align: middle; border: 2px solid #ccc; cursor: move; border-radius: 5px;">
              <div style="text-align: center;justify-content: center;display: flex;align-items: center; height: 100%">
                <text @selector="label"></text>
              </div>
            </foreignObject>
        `;
    }
}

export class Start extends shapes.standard.Circle {
    override defaults() {
        return {
            ...super.defaults,
            type: 'adaptflow.Start'
        };
    }
}

export class End extends shapes.standard.Circle {
    override defaults() {
        return {
            ...super.defaults,
            type: 'adaptflow.End'
        };
    }
}

export class LLMProvider extends shapes.standard.Rectangle {
    override defaults() {
        return {
            ...super.defaults,
            type: 'adaptflow.LLMProvider'
        };
    }
}