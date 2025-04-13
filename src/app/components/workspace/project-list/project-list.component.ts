import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../interface/project.interface';
import { TileComponent } from '../tile/tile.component';
import { CommonModule } from '@angular/common';
import { AdaptflowService } from '../../../services/rest/adaptflow.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'project-list',
  standalone: true,
  imports: [TileComponent, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  private subscription: Subscription = new Subscription();
  projectRows: Project[][] = [];

  constructor(private adaptflowService: AdaptflowService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.adaptflowService.getAllProcessDefinitions().subscribe(processes => {
        this.projects = processes;
        this.projectRows = this.createProjectRows(this.projects, 3);
      })
    );
  }

  createProjectRows(projects: Project[], rowSize: number): Project[][] {
    const rows: Project[][] = [];
    if(projects.length < 3) {
      rows.push(projects);
    } else {
      for (let i = 0; i < projects.length; i += rowSize) {
        rows.push(projects.slice(i, i + rowSize));
      }
    }
    return rows;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
