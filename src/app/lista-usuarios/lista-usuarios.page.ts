import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/Usuario.models';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ListaUsuariosPage {

  listaUsuarios: Usuario[] = [];
  searchTerm: string = '';
  usuario: any;

  constructor(private usuarioService: UsuarioService, private router: Router, private alertController: AlertController) { }

  ionViewWillEnter() {
    this.buscarUsuarios();
  }

  buscarUsuarios(){
    this.usuarioService.getAllUsers().subscribe(dados => {
      this.listaUsuarios = dados;
    });
  }

  alterarUsuario(id: number){
    this.router.navigateByUrl(`/alterar-usuario/${id}`);
  }

  excluirUsuario(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.listaUsuarios = this.listaUsuarios.filter(p => p.id !==id);
    });
  }

  async confirmarExclusao(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.excluirUsuario(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
