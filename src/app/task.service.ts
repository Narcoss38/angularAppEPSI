import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {}


  getAllTasks(): Task[] {
    return this.tasks;
  }


  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  getTaskById(id: number): Task | null {
    const task = this.tasks.find(task => task.id === id);
    return task ? { ...task } : null;
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
