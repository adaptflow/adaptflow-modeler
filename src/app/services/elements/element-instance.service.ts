import { Injectable } from '@angular/core';
import * as Constants from '../../constants/elements.constant';
import { LlmService } from '../common/llm.service';
import { EmbeddingsService } from '../common/embeddings.service';

@Injectable({
  providedIn: 'root'
})
export class ElementInstanceService {

  constructor(
    private llmService: LlmService,
    private embeddingService: EmbeddingsService
  ) { }

  getInstance(type:string) {
    if(type==Constants.ELEMENT_TYPE_LLM_PROVIDER) {
      return this.llmService.getInstance();
    }
    if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_GENERATE) {
      return this.embeddingService.getInstance(type);
    }
    if(type==Constants.ELEMENT_TYPE_EMBEDDINGS_STORE) {
      return this.embeddingService.getInstance(type);
    }
    return null;
  }
}
