import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'general-properties',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './general-properties.component.html',
  styleUrl: './general-properties.component.scss'
})
export class GeneralPropertiesComponent implements OnInit {
  generalPropertiesForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.generalPropertiesForm = new FormGroup({
      processName: new FormControl('', [Validators.required, Validators.minLength(3)]), // Added validators
    });
  }

  get processName() {
    return this.generalPropertiesForm.get('processName');
  }
}
