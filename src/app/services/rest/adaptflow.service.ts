import { Injectable } from '@angular/core';
import { CREDENTIAL_PROVIDERS, GENERATE_EMBEDDINGS, LLM_PROVIDER, STORE_EMBEDDINGS } from './adaptflow-mock.data';
import * as Constants from '../../constants/elements.constant';

@Injectable({
  providedIn: 'root'
})
export class AdaptflowService {

  constructor() { }

  getElement(type: string) {
    if(type==Constants.ELEMENT_TYPE_LLM_PROVIDER) {
      return LLM_PROVIDER;
    }
    if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_GENERATE) {
      return GENERATE_EMBEDDINGS;
    }
    if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_STORE) {
      return STORE_EMBEDDINGS;
    }
    return null;
  }

  getCredentialProviders() {
    return CREDENTIAL_PROVIDERS;
  }
}
