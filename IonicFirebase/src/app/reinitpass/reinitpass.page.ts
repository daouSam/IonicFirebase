import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-reinitpass',
  templateUrl: './reinitpass.page.html',
  styleUrls: ['./reinitpass.page.scss'],
})
export class ReinitpassPage implements OnInit {
  userId: string;
  passd1: string;
  passda: string;
  passdN: string;
  passdC: string;
  usersam: any;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private conn: AngularFireAuth) { }

  ngOnInit() {

  }
  async updatepassd(){
    const loading = await this.loadingCtrl.create({
      message: 'updating....',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    if(this.passd1 !=='' && this.passdN !=='' && this.passdC){
      this.conn.authState.subscribe(verifi => {
        if(verifi){
          this.afs.collection('utilisateur').doc(verifi.uid).valueChanges().subscribe(resulta =>{
            this.usersam = resulta;
            if(this.passdN === this.passdC){
              console.log(this.passd1);
              console.log(this.usersam.utilisateurPassd);
              if(this.passd1 === this.usersam.utilisateurPassd){
                verifi.updatePassword(this.passdN).then(() => {
                  this.auth.toast('mot de passe modifié avec succès','success');
                }).catch((error) => {
                  this.auth.toast(error.message, 'danger');
                });
              }else{
                this.auth.toast('ancien mot passe incorret !','danger');
              }
            }else{
              this.auth.toast('les deux champs sont différents','danger');
            }
          });
        }else{
          this.auth.toast('error de connexion','danger');
        }
      });
    }else{
      this.auth.toast('remplit les champs !','danger');
    }
  }

  //   if(this.passdN === this.passdC && this.passd1 === this.passda){

  //     this.afs.collection('utilisateur').doc(this.userId).update({
  //       utilisateurId: this.userId,
  //       utilisateurPassd: this.passdN
  //     }).then(() => {
  //       loading.dismiss();
  //       this.auth.toast('modification effectuer', 'success');
  //       this.router.navigateByUrl('profile');
  //       loading.present();
  //     })
  //     .catch(error => {
  //       this.auth.toast(error.message, 'danger');
  //     });
  //   }else{
  //     this.auth.toast('ancien ou noveau mot de passe incorrect','danger');
  //   }

  // }

}
