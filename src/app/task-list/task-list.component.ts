import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = []; 
  filteredTasks: Task[] = [];
  currentFilter: string = 'all';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getAllTasks(); 
    this.filteredTasks = this.filterTasks(this.currentFilter);
  }


  filterTasks(filter: string): Task[] {
    switch (filter) {
      case 'all':
        return this.tasks;
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'todo':
        return this.tasks.filter(task => !task.completed);
      default:
        return this.tasks;
    }
  }

  updateFilter(filter: string) {
    this.currentFilter = filter;
    this.filteredTasks = this.filterTasks(filter);
  }
}
