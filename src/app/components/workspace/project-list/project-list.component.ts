import { Component } from '@angular/core';
import { Project } from '../../../interface/project.interface';
import { TileComponent } from '../tile/tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-list',
  standalone: true,
  imports: [TileComponent, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projects: Project[] = [
    // Your project data here.  Example:
    {id: '1', name: 'Project 1', description: 'Description 1', lastModified: new Date()},
    {id: '2', name: 'Project 2', description: 'Description 2', lastModified: new Date()},
    {id: '3', name: 'Project 3', description: 'Description 3', lastModified: new Date()},
    {id: '4', name: 'Project 4', description: 'Description 4', lastModified: new Date()},
    {id: '5', name: 'Project 5', description: 'Description 5', lastModified: new Date()},
    {id: '6', name: 'Project 6', description: 'Description 6', lastModified: new Date()},
    {id: '7', name: 'Project 7', description: 'Description 7', lastModified: new Date()},
    {id: '8', name: 'Project 8', description: 'Description 8', lastModified: new Date()},
    {id: '9', name: 'Project 9', description: 'Description 9', lastModified: new Date()}

  ];

  projectRows: Project[][] = [];

  constructor() {
    this.projectRows = this.createProjectRows(this.projects, 3);
  }

  createProjectRows(projects: Project[], rowSize: number): Project[][] {
    const rows: Project[][] = [];
    for (let i = 0; i < projects.length; i += rowSize) {
      rows.push(projects.slice(i, i + rowSize));
    }
    return rows;
  }
}
