import { Injectable } from '@angular/core';
import { ElementInstance } from '../../interface/element-instances.interface';
import { AdaptflowService } from '../rest/adaptflow.service';
import * as Constants from '../../constants/elements.constant';

export interface LlmInstance extends ElementInstance {
}

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  instance: ElementInstance;
  constructor(private adaptflowService: AdaptflowService) { }
  
  getInstance(): ElementInstance {
    this.instance = this.adaptflowService.getElement(Constants.ELEMENT_TYPE_LLM_PROVIDER);
    return this.instance;
  }
}
