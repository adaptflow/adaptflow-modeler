import { Injectable } from '@angular/core';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GeneralPropertiesService {

  constructor(private facadeService: ElementSelectionFacadeService) { }

  public addGeneralProperties(generalProperties, formName: string) {
    this.facadeService.onGeneralPropertiesUpdate(generalProperties, formName);
  }

  public addDefaultGeneralProperties() {
    let defaultGeneralProperties = [
      {
          id: 'af-' + uuid(),
          name: 'Process Name',
          type: 'text',
          required: true,
          minLength: 3,
          value: '',
      }
    ];
    this.facadeService.onGeneralPropertiesUpdate(defaultGeneralProperties, null);
  }
}
