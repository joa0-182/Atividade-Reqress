import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from '../models/Usuario.models';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.page.html',
  styleUrls: ['./criar-usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class CriarUsuarioPage implements OnInit {

  id = 0;
  first_name = '';
  last_name = '';
  email = '';
  avatar = '';

  constructor(private usuarioService: UsuarioService, private route: Router) { }

  ngOnInit() {
  }

  salvar() {
    const usuario: Usuario = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      avatar: this.avatar
    };

    this.usuarioService.create(usuario).subscribe((dados) => {
      window.alert(`Concluido com exito!\nId Usuario: ${dados.id}\nUsuario inserido: ${dados.first_name}`);
      this.route.navigateByUrl('/lista-usuarios')
    });
  }

}
