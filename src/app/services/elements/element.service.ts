import { Injectable } from '@angular/core';

import { dia, util } from '@joint/core';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
    constructor() { }

    public getElement(element, position) {
        let newElement;
        if (element.name != 'rect') {
            newElement = new Node({
                attrs: ({
                    label: {
                        text: element.name,
                    }
                })
            });
            newElement.position(position.x, position.y);
            newElement.resize(150, 50);
            newElement.prop({'type': element.type});
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