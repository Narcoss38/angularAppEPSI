import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  get nameControl() {
    return this.taskForm.get('name');
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      alert("Le nom de la tâche ne peut pas être vide.");
      return;
    }

    const newTask: Task = {
      id: this.taskService.generateRandomId(),
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      completed: false
    };

    this.taskService.addTask(newTask);

    this.router.navigate(['/']);
  }
}
