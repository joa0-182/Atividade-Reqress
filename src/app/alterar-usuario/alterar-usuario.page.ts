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
  primeiro_nome = '';
  sobrenome = '';
  email = '';
  usuario_imagem = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.usuarioService.getOne(this.id).subscribe(retorno => {
      this.primeiro_nome = retorno.primeiro_nome as string;
      this.sobrenome = retorno.sobrenome ? retorno.sobrenome : '';
      this.email = retorno.email ? retorno.email : 0;
      this.usuario_imagem = retorno.usuario_imagem ? retorno.usuario_imagem : '';
    })
  }

  salvar(){
    const usuario: Usuario = {
      id: this.id,
      primeiro_nome: this.primeiro_nome,
      sobrenome: this.sobrenome,
      email: this.email,
      usuario_imagem: this.usuario_imagem
   };
   this.usuarioService.update(usuario).subscribe((dados) =>
   {
     window.alert(`Concluido com exito!\nUsuario alterado: ${dados.id} -> ${dados.primeiro_nome}`);
     this.router.navigateByUrl('/lista-usuarios')
   });
  }

}
