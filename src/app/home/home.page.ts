import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UtilService } from '../services/util.service';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: any[] = [];

  constructor(public dB: AngularFireDatabase, private authService:  AuthenticationService,private nav: NavController, private alertCtrl: AlertController, private utilService: UtilService, private actionSheetCtrl: ActionSheetController) {
    let taskJson = localStorage.getItem('taskDb');

    if (taskJson != null) {
      this.tasks = JSON.parse(taskJson);
    }
  }

  private PATH = 'tarefas/';

  getAll() {
    return this.dB.list(this.PATH)
    
  }

  get(key: string) {

  }

  save(contact: any) {

  }

  remove(key: string){

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

  upDB(){
    this.dB.database.ref('/tarefas').push(this.tasks.values)
    .then(() => {
      console.log('salvou');
    })
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
          if (this.tasks.length > 0) {
            this.utilService.showToast('Tarefas excluídas');
          }
          this.tasks.splice(0, this.tasks.length);
          this.updateLocalStorage();
        }
      }, {
        text: 'Excluir tarefas feitas',
        role: 'destructive',
        icon: 'close-circle',
        handler: () => {
          if (this.tasks.filter(taskArray => taskArray.done == true).length > 0) {
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

  async chamaActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Log In',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Registrar',
        icon: 'create',
        handler: () => {
          this.nav.navigateForward('registration');
        }
      }, {
        text: 'Entrar',
        icon: 'log-in',
        handler: () => {
          this.nav.navigateForward('login');
        }
      }, {
        text: 'Sair',
        icon: 'log-out',
        handler: () => {
          this.authService.SignOut();
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




