import { Utilisateur } from './../models/utilisateur';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
// import core firebase client (required)
import '@firebase/app';

// import Firebase Authentication (optional)
import '@firebase/auth';

// import Firebase Realtime Database (optional)
import '@firebase/database';

// import Cloud Firestore (optional)
import '@firebase/firestore';
// import * as firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase/compat';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<Utilisateur>;
  user: Utilisateur;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  )
  {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => {
          if (user) {
              return this.afs.doc<Utilisateur>(`utilisateur/${user.uid}`).valueChanges();
          } else {
              return of(null);
          }
      })
  );
  }

  async signIn(email, passd)
  {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating.....',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
      this.afauth.signInWithEmailAndPassword(email, passd)
      .then((data)=>
      {
        if(!data.user.emailVerified)
        {
          loading.dismiss();
          this.toast('please verify your mail', 'success');
          this.afauth.signOut();
        }else
        {
          loading.dismiss();
          this.router.navigateByUrl('home');
        }
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });

  }
  async userDetails() {
    return this.afauth.user;
  }

  async signOut()
  {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afauth.signOut()
    .then(()=> {
      loading.dismiss();
      this.router.navigateByUrl('/login');
    });
  }

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}


