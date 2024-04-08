import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { DocumentTasks, ListTasks, Task } from './models/TodoData';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CdkDropListGroup, CdkDropList, CdkDrag, FormsModule, DialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dates: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  todoList: ListTasks[] = [];
  colors: string[] = [
    "bg-primary",
    "bg-primary-subtle",
    "bg-secondary",
    "bg-secondary-subtle",
    "bg-success",
    "bg-success-subtle",
    "bg-danger",
    "bg-danger-subtle",
    "bg-warning",
    "bg-warning-subtle",
    "bg-info",
    "bg-info-subtle",
    "bg-light",
    "bg-light-subtle",
    "bg-dark",
    "bg-dark-subtle",
    "bg-body-secondary",
    "bg-body-tertiary",
    "bg-body",
    "bg-black",
    "bg-white",
    "bg-transparent"
  ];
  nameTodo: string | undefined = '';
  color: string = '';

  constructor(public dialog: Dialog, private taskService: TasksService) {
    this.taskService.getTasks().subscribe((tasks: DocumentTasks) => {
      this.todoList = tasks.todoList;
    });
  }

  openDialog(index: number): void {
    console.log("todoList", this.todoList);

    const dialogRef = this.dialog.open<string>(DialogComponent, {
      width: '500px',
      data: {
        name: this.nameTodo,
        color: this.color,
        colors: this.colors,
        dates: this.dates,
        index: index
      },
    });

    dialogRef.closed.subscribe((result: any) => {
      if(result){
        this.addTask(index, result);
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  async addTask(i: number, task: Task){
    this.todoList[i].todos.push(task)
    try {
      let doc = {todoList: this.todoList}
      this.taskService.updateTasks(doc)
    } catch (error) {
      console.log("error", error);
    }
  }

  async saveTasks(){
    try {
      let doc = {todoList: this.todoList}
      this.taskService.updateTasks(doc)
    } catch (error) {
      console.log("error", error);
    }
  }

  deleteTasks(indexList: number, indexItem: number) {
    this.todoList[indexList].todos.splice(indexItem, 1);
  }
}
