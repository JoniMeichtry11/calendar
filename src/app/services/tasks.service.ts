import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DocumentTasks, ListTasks, Task } from '../models/TodoData';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _firestore = inject(Firestore);

  constructor(private firestore: Firestore){}

  getTasks(){
    const docRef = doc(this.firestore, "listTask", "fIT30RWhKMtzCG8OcYKF");
    return docData(docRef) as Observable<DocumentTasks>;
  }

  updateTasks(listTasks: any){
    const docRef = doc(this.firestore, "listTask", "fIT30RWhKMtzCG8OcYKF");
    return updateDoc(docRef, listTasks);
  }
}
