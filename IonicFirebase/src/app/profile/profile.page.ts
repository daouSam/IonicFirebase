import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  constructor(private auth: AuthService, private router: Router, private database: AngularFirestore) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }
  logout(){
    this.user = '';
    this.router.navigateByUrl('/bienvenue');
  }

}
