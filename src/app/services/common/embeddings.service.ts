import { Injectable } from '@angular/core';
import * as Constants from '../../constants/elements.constant';
import { ElementInstance } from '../../interface/element-instances.interface';
import { AdaptflowService } from '../rest/adaptflow.service';

@Injectable({
  providedIn: 'root'
})
export class EmbeddingsService {
  instance: ElementInstance;
  constructor(private adaptflowService: AdaptflowService) { }
  
  getInstance(type:string): ElementInstance {
    if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_GENERATE) {
      this.instance = this.adaptflowService.getElement(Constants.ELEMENT_TYPE_EMBEDDINGS_GENERATE);
      return this.instance;
    } else if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_STORE) {
      this.instance = this.adaptflowService.getElement(Constants.ELEMENT_TYPE_EMBEDDINGS_STORE);
      return this.instance;
    }
    return null;
  }
}
