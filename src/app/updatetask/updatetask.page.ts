import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './updatetask.page.html',
  styleUrls: ['./newtask.page.scss'],
})
export class NewtaskPage implements OnInit {
  categories = ['work', 'personal', 'home'];

  taskName;
  taskDate;
  taskPriority;
  taskCategory;

  taskObject;

  constructor(public modalCtrl: ModalController, public todoService: TodoService) { }

  ngOnInit() {
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.taskObject);

  }

  selectedCategory(index){
this.taskCategory = this.categories[index];
  }

async add(){
  this.taskObject = ({itemName:this.taskName,
      itemDueDate:this.taskDate,
      itemPriority:this.taskPriority,
    itemCategory:this.taskCategory});

  const uid =this.taskName + this.taskDate;

  if (uid) {
    await this.todoService.addTask(uid, this.taskObject);
  } else {
    console.log('can\'t save empty task');
  }

  this.dismis();

}

}
