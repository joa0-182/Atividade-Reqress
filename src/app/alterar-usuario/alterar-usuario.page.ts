import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../models/Usuario.models';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.page.html',
  styleUrls: ['./alterar-usuario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlterarUsuarioPage implements OnInit {

  id = 0;
  first_name = '';
  last_name = '';
  email = '';
  avatar = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.usuarioService.getUser(this.id).subscribe(retorno => {
      this.first_name = retorno.first_name as string;
      this.last_name = retorno.last_name ? retorno.last_name : '';
      this.email = retorno.email ? retorno.email : '';
      this.avatar = retorno.avatar ? retorno.avatar : '';
    })
  }

  salvar() {
    const usuario: Usuario = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      avatar: this.avatar
    };
    this.usuarioService.update(usuario).subscribe((dados) => {
      window.alert(`Concluido com exito!\nUsuario alterado: ${dados.id} -> ${dados.first_name}`);
      this.router.navigateByUrl('/lista-usuarios')
    });
  }

}
