import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './../services/auth.service';


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

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userId = user.utilisateurId;
      this.passd1 = user.utilisateurPassd;
    });
  }
  async updatepassd(){
    const loading = await this.loadingCtrl.create({
      message: 'updating....',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    if(this.passdN === this.passdC){

      this.afs.collection('utilisateur').doc(this.userId).set({
        utilisateurId: this.userId,
       utilisateurPassd: this.passdN
      },{merge: true})
      .then(() => {
        loading.dismiss();
        this.auth.toast('modification effectuer', 'success');
        this.router.navigateByUrl('profile');
        loading.present();
      })
      .catch(error => {
        this.auth.toast(error.message, 'danger');
      });
    }else{
      this.auth.toast('ancien ou noveau mot de passe incorrect','danger');
    }

  }

}
