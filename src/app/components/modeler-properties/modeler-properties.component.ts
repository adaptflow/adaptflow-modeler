import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ElementPropertiesComponent } from './element-properties/element-properties.component';
import { GeneralPropertiesComponent } from './general-properties/general-properties.component';

@Component({
  selector: 'modeler-properties',
  standalone: true,
  imports: [CommonModule, TabViewModule, GeneralPropertiesComponent, ElementPropertiesComponent],
  templateUrl: './modeler-properties.component.html',
  styleUrl: './modeler-properties.component.scss'
})
export class ModelerPropertiesComponent implements OnInit {
  ngOnInit(): void {

  }
}

