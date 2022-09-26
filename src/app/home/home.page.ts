import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { NavController } from '@ionic/angular';
/////////////////////
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: any[] = [];

  constructor(private nav: NavController, private alertCtrl: AlertController, private utilService: UtilService, private actionSheetCtrl: ActionSheetController) {
    let taskJson = localStorage.getItem('taskDb');

    if (taskJson != null) {
      this.tasks = JSON.parse(taskJson);
    }
  }

  goToRegistration(){
    this.nav.navigateForward('registration');
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar tarefa',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'Digite a tarefa...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('clicked cancel')
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {

            console.log(form.newTask);

            this.add(form.newTask);
          }
        }
      ]
    });

    await alert.present();
  }

  async add(newTask: string) {
    if (newTask.trim().length < 1) {
      this.utilService.showToast('Informe a tarefa')
      return;
    }

    let task = { name: newTask, done: false };

    this.tasks.push(task);

    this.updateLocalStorage();

    this.utilService.showToast('Tarefa adicionada')
  }

  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
  }

  async mark(task) {
    task.done = !task.done;
    this.updateLocalStorage();
  }

  async deleteTask(task: any) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir a tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('clicked cancel')
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.tasks = this.tasks.filter(taskArray => task != taskArray);
            this.updateLocalStorage();
            this.utilService.showToast('Tarefa excluída')
          }
        }
      ]
    });
    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Excluir',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Excluir lista',
        role: 'destructive',
        icon: 'trash',
        data: {
          type: 'delete'
        },
        handler: () => {
          if(this.tasks.length > 0){
            this.utilService.showToast('Tarefas excluídas');
          }
          this.tasks.splice(0, this.tasks.length);
          this.updateLocalStorage();
        }
      },{
        text: 'Excluir tarefas feitas',
        role: 'destructive',
        icon: 'close-circle',
        handler: () => {
          if(this.tasks.filter(taskArray => taskArray.done == true).length > 0){
            this.utilService.showToast('Tarefas excluídas');
          }
          this.tasks = this.tasks.filter(taskArray => taskArray.done == false);
          this.updateLocalStorage();
        }     
      }, 
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}




