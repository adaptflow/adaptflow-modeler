import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabView, TabViewModule } from 'primeng/tabview';
import { ElementPropertiesComponent } from './element-properties/element-properties.component';
import { GeneralPropertiesComponent } from './general-properties/general-properties.component';
import { dia } from '@joint/core';

@Component({
  selector: 'modeler-properties',
  standalone: true,
  imports: [CommonModule, TabViewModule, GeneralPropertiesComponent, ElementPropertiesComponent],
  templateUrl: './modeler-properties.component.html',
  styleUrl: './modeler-properties.component.scss'
})
export class ModelerPropertiesComponent implements AfterViewInit {
  @Input()
  graph: dia.Graph;
  // @ViewChild(TabView) tabView: TabView;
  ngAfterViewInit(): void {
    // if (this.tabView) {
    //   this.tabView.activeIndex = 1;
    // }
  }
}
