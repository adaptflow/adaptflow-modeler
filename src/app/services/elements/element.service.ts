import { Injectable } from '@angular/core';

import { dia, shapes, util } from '@joint/core';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
    constructor() { }

    public getElement(elementName, position) {
        let newElement;
        if (elementName != 'rect') {
            newElement = new NodeElement({
                attrs: ({
                    label: {
                        text: elementName,
                    }
                })
            });
            newElement.position(position.x, position.y);
            newElement.resize(150, 50);
        }
        return newElement;
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

export class NodeElement extends ForeignObjectElement {
    override defaults() {
        return {
            ...super.defaults(),
            type: 'Card',
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