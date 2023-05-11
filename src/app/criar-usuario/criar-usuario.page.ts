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

  primeiro_nome = '';
  sobrenome = '';
  email = '';
  usuario_imagem = '';

  constructor(private usuarioService: UsuarioService, private route:Router) { }

  ngOnInit() {
  }

  salvar(){
    const usuario: Usuario = {
       primeiro_nome: this.primeiro_nome,
       sobrenome: this.sobrenome,
       email: this.email,
       usuario_imagem: this.usuario_imagem
    };
    this.usuarioService.create(usuario).subscribe((dados) => {
      window.alert(`Concluido com exito!\nId Produto: ${dados.id}\nProduto inserido: ${dados.primeiro_nome}`);
      this.route.navigateByUrl('/lista-produtos')
    });
 }

}
