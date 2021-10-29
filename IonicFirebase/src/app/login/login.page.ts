import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  passd: string;
  constructor(
    private auth: AuthService,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.email && this.passd){
      this.auth.signIn(this.email, this.passd);
    }else{
      this.toast('entrer votre information !','warning');
    }
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
