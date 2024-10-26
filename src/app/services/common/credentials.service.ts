import { Injectable } from '@angular/core';

export interface Credential {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  credential: Credential;

  //type: llm models, embeddings
  //provider: openai, azure
  get(type:string, provider:string) {
    this.credential = {
      name: "llm-openai" 
    }
    return this.credential;
  }
}
