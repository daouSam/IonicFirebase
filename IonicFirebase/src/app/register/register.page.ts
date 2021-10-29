import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  datec: Date;
  passd: string;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private toastr: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }
  async register(){
    if(this.nom && this.prenom && this.email && this.phone && this.passd){
      const loading = await this.loadingCtrl.create({
        message: 'en cours..',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email, this.passd)
      .then((data)=> {
        data.user.sendEmailVerification();
        this.afs.collection('utilisateur').doc(data.user.uid).set({
          utilisateurId: data.user.uid,
          utilisateurNom: this.nom,
          utilisateurPrenom: this.prenom,
          utilisateurEmail: this.email,
          utilisateurPhone: this.phone,
          utilisateurPassd: this.passd,
          dateCreation: Date.now()
        })
        .then(() => {
          loading.dismiss();
          this.toast('Registration effectue !','success');
          this.router.navigateByUrl('login');
        })
        .catch(error => {
          loading.dismiss();
          //console.log(error);
          this.toast(error.message, 'danger');
        });
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
    }else{
      this.toast('remplicer les champs !', 'warning');
    }
  }//end of registration

  async toast(message: any, status: any){
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }//fin toast
}
