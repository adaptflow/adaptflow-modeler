import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ElementSelectionFacadeService } from '../../../../store/facade/element-selection.facade.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { dia } from '@joint/core';

@Component({
  selector: 'element-properties',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './element-properties.component.html',
  styleUrl: './element-properties.component.scss'
})
export class ElementPropertiesComponent implements OnInit {
  @Input()
  graph: dia.Graph;
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
            const element = this.graph.getCell(this.selectedElementId) as dia.Element;
            const text = field.value || '';
            element.attr('label/text', text);
            this.resizeElementBasedOnText(element, text);
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

  resizeElementBasedOnText(element: dia.Element, text: string) {
    if (!element) return;

    const padding = 20;
    const fontSize = element.attr('label/font-size') || 14;
    const fontFamily = element.attr('label/font-family') || 'Arial';

    // Create a temporary SVG text element to measure the text width
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('font-size', fontSize.toString());
    textElement.setAttribute('font-family', fontFamily);
    textElement.textContent = text;
    svg.appendChild(textElement);
    document.body.appendChild(svg);

    // Get the bounding box of the text
    const bbox = textElement.getBBox();
    document.body.removeChild(svg);

    // Calculate the new width and height
    const newWidth = bbox.width + padding * 2;
    const newHeight = bbox.height + padding * 2;

    // Update the element's size
    element.resize(newWidth, newHeight);
  }
}
