import { NewtaskPage } from './../newtask/newtask.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from './../updatetask/updatetask.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList = [];

  today: number = Date.now();

  buttonColor = '#000';

  constructor(public modalCtrl: ModalController, public todoService: TodoService) {
    this.getAllTask();
  }

  async addTask(){
    const modal = await this.modalCtrl.create({
      component: NewtaskPage
    });

    modal.onDidDismiss().then(taskObj => {
      //console.log(taskObj.data);
      //this.todoList.push(taskObj.data);
      this.getAllTask();

    });

    return await modal.present();

  }

  getAllTask() {
    this.todoList = this.todoService.getAllTasks();
  }

  delete(key){
    this.todoService.deleteTask(key);
    this.getAllTask();
    //this.todoList.splice(index,1);

  }

  async update(selectedTask) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    });

    modal.onDidDismiss().then(() => {
      this.getAllTask();
    });

    return await modal.present();
  }

}
