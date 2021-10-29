import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  term: any;
  itemsCollect: AngularFirestoreCollection;
  items: Observable<any[]>;
  public foodList: any[];
  foodListBackup: Observable<any[]>;

  constructor(private firestore: AngularFirestore) { }

  async ngOnInit() {
      this.foodList = await this.getData();
  }

  async getData(): Promise<any>{
    this.itemsCollect = this.firestore.collection('utilisateur');
    this.items = this.itemsCollect.valueChanges();
    this.foodListBackup = this.items;
    return this.items;
  }

}
