import { Injectable } from '@angular/core';
import { ElementSelectionFacadeService } from '../../store/facade/element-selection.facade.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralPropertiesService {

  constructor(private facadeService: ElementSelectionFacadeService) { }

  public addGeneralProperties(generalProperties, formName: string) {
    this.facadeService.onGeneralPropertiesUpdate(generalProperties, formName);
  }
}
