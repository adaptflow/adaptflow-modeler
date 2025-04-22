import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { distinctUntilChanged, filter, startWith, Subscription } from 'rxjs';
import { ElementSelectionFacadeService } from '../../../../store/facade/element-selection.facade.service';
import { GeneralProperty } from '../../../../interface/general-properties-interface';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'general-properties',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './general-properties.component.html',
  styleUrl: './general-properties.component.scss'
})
export class GeneralPropertiesComponent implements OnInit, OnDestroy {
  generalPropertiesForm!: FormGroup;
  generalProperties: GeneralProperty[] = [];
  private subscription: Subscription = new Subscription();
  isFormInitialization: Boolean = false;

  constructor(
    private facadeService: ElementSelectionFacadeService
  ) {}

  ngOnInit(): void {
    this.isFormInitialization = true;
    this.subscription.add(
      this.facadeService.generalProperties$.subscribe((generalProperties) => {
        this.generalProperties = generalProperties;
        this.initForm();
        this.subscription.add(
          this.generalPropertiesForm?.valueChanges.pipe(
            startWith(this.generalPropertiesForm?.value),
            filter(() => !!this.generalPropertiesForm),
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
            ).subscribe((values) => {
            if(this.isFormInitialization) {
              this.isFormInitialization = false;
            } else {
              let updatedGeneralProperties = this.generalProperties.map(property => {
                return {
                  ...property,
                  value: values[property.id] || ''
                };
              });
              this.facadeService.onGeneralPropertiesUpdate(updatedGeneralProperties, 'generalPropertiesForm');
            }
          })
        );
      })
    );
  }

  private initForm() {
    const group: any = {};
    this.generalProperties.forEach((property) => {
      const validators = property.required ? [Validators.required] : [];
      group[property.id] = new FormControl(property.value || '', validators);
    });
    this.generalPropertiesForm = new FormGroup(group);
  }

  getControl(id: string): FormControl | null {
    const control = this.generalPropertiesForm.get(id);
    if (control instanceof FormControl) {
      return control as FormControl;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
