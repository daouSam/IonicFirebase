import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  itemsCollect: AngularFirestoreCollection;
  items: Observable<any[]>;

  constructor(public fire: AngularFirestore) {}
  ngOnInit(){
    this.getData();
  }

  async getData(){
    this.itemsCollect = this.fire.collection('utilisateur');
    this.items = this.itemsCollect.valueChanges();
  }

}
