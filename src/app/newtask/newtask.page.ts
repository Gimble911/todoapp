import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.page.html',
  styleUrls: ['./newtask.page.scss'],
})
export class NewtaskPage implements OnInit {

  taskName;
  taskDate;
  taskPriority;

  taskObject ={};

  constructor(public modalCtrl: ModalController, public todoService: TodoService) { }

  ngOnInit() {
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.taskObject);
  }

  async add(){
    this.taskObject = ({taskName:this.taskName,
      taskDate:this.taskDate,
      taskPriority:this.taskPriority});

    // eslint-disable-next-line prefer-const
    let uid =this.taskName + this.taskDate;

    if (uid) {
      await this.todoService.addTask(uid, this.taskObject);
    } else {
      console.log('can\'t save empty task');
    }

    this.dismis();

  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  async dismiss(){
    await this.modalCtrl.dismiss(this.taskObject);
  }

}
