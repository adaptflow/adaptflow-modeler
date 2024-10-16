import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementListService {

  constructor() { }

  public get() {
    let elementList = [
      {
        type: "LLM",
        elements: [{
          name: "Provider"
        }]
      },
      {
        type: "Embeddings",
        elements: [{
          name: "Generate Embeddings"
        },{
          name: "Store Embeddings"
        }]
      },
      {
        type: "Document Retrieval",
        elements: [{
          name: "Vector Store"
        }]
      }
    ];
    return elementList;
  }
}
