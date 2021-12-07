import { NewtaskPage } from './../newtask/newtask.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList = [];

  today: number = Date.now();

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

  async update() {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage
    });
  }

}
