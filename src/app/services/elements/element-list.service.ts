import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementListService {

  constructor() { }

  public get() {
    let elementList = [
      {
        type: "General",
        elements: [
        {
          name: "Condition",
          shape: "af.polygon",
          type: "af.standard"
        }]
      },
      {
        type: "LLM",
        elements: [{
          name: "LLM Provider",
          type: "af.llm.provider"
        }]
      },
      {
        type: "Embeddings",
        elements: [{
          name: "Generate Embeddings",
          type: "af.embeddings.generate"
        },{
          name: "Store Embeddings",
          type: "af.embeddings.store"
        }]
      },
      {
        type: "Store",
        elements: [{
          name: "Elastic Search",
          type: "af.vector-store.elasticSearch"
        }]
      }
    ];
    return elementList;
  }
}
