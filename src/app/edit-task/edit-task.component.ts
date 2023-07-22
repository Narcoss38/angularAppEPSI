import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task!: Task;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.task = this.taskService.getTaskById(taskId)!;

    this.taskForm = this.formBuilder.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description],
      completed: [this.task.completed]
    });

    this.taskForm.valueChanges.subscribe((value) => {
      this.task.name = value.name;
      this.task.description = value.description;
      this.task.completed = value.completed;
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      alert("Le nom de la tâche ne peut pas être vide.");
      return;
    }

    this.taskService.updateTask(this.task);

    this.router.navigate(['/']); 
  }
}
