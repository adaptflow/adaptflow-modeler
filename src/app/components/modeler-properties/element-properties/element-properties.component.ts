import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ElementSelectionFacadeService } from '../../../store/facade/element-selection.facade.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'element-properties',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './element-properties.component.html',
  styleUrl: './element-properties.component.scss'
})
export class ElementPropertiesComponent implements OnInit {
  elementPropertiesForm: FormGroup;
  showElementPropertiesForm: boolean = false;
  selectedElement;
  selectedElementId:string;

  constructor(
    private facadeService: ElementSelectionFacadeService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.elementPropertiesForm = this.fb.group({});
    this.fillElementPropertiesForm();
  }

  onElementPropertiesUpdate() {
    this.elementPropertiesForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(values=> {
      let updatedValues = _.cloneDeep(this.selectedElement);
      updatedValues.fields = updatedValues.fields.map(field => ({
        ...field,
        value: values[field.fieldId] || ''
      }));
      console.log(this.selectedElementId, updatedValues);
      this.facadeService.onUpdate(this.selectedElementId, updatedValues);
      // this.selectedElement.fields.forEach(field => {
      //   console.log(this.elementPropertiesForm);
      //   if(field.type=='input'){
      //     field = {
      //       ...field,
      //       value: values[field.fieldId] || ''
      //     }
      //   }
      //   if(field.type=='selection'){
      //     field = {
      //       ...field,
      //       value: values[field.fieldId] || ''
      //     }
      //   }
      // });
    });
  }

  fillElementPropertiesForm() {
    this.facadeService.selectedElement$
    .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
    .subscribe((elementSelection)=> {
      const allElements = elementSelection.elements;
      if(_.isEmpty(allElements))
        return;
      this.selectedElementId = elementSelection.selectedElementId;
      this.selectedElement = allElements[this.selectedElementId];
      if(this.selectedElement) {
        this.elementPropertiesForm = this.fb.group({});
        this.selectedElement.fields.forEach((field) => {
          if (field.type=='selection') {
            this.elementPropertiesForm.addControl(
              field.fieldId,
              this.fb.control(field.value || '')
            );
          } else if (field.type=='input') {
            this.elementPropertiesForm.addControl(
              field.fieldId,
              this.fb.control(field.value || '')
            );
          }
        });
        this.showElementPropertiesForm = true;
        this.onElementPropertiesUpdate();
      }
      else {
        this.showElementPropertiesForm = false;
      }
      this.cdr.detectChanges()
    });
  }
}
