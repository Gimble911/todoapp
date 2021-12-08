import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.page.html',
  styleUrls: ['./updatetask.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;

  taskName;
  taskDate;
  taskPriority;

  taskObject = {};

  constructor(public modalCtlr: ModalController, public todoServive: TodoService) { }

  ngOnInit() {

    this.taskName = this.task.value.taskName;
    this.taskDate = this.task.value.taskDate;
    this.taskPriority = this.task.value.taskPriority;
  }

  async dismis(){
    await this.modalCtlr.dismiss();
  }

  async update(){
    this.taskObject = ({taskName:this.taskName, taskDate:this.taskDate, taskPriority:this.taskPriority});
    const uid = this.task.key;
    await this.todoServive.updateTask(uid, this.taskObject);
    this.dismis();
  }
}
