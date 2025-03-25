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
          type: "adaptflow.Condition"
        }]
      },
      {
        type: "LLM",
        elements: [{
          name: "LLM Provider",
          type: "adaptflow.LLMProvider"
        }]
      },
      {
        type: "Embeddings",
        elements: [{
          name: "Generate Embeddings",
          type: "adaptflow.GenerateEmbeddings"
        },{
          name: "Store Embeddings",
          type: "adaptflow.StoreEmbeddings"
        }]
      },
      {
        type: "Store",
        elements: [{
          name: "Elastic Search",
          type: "adaptflow.ElasticSearch"
        }]
      }
    ];
    return elementList;
  }
}
