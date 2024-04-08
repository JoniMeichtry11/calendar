import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"listtasks-c0977","appId":"1:333423519125:web:0c9694fa96fcdba724829c","storageBucket":"listtasks-c0977.appspot.com","apiKey":"AIzaSyB9Rc0wpq_w_U7hwJ8s1QePEaxW68Nz9nU","authDomain":"listtasks-c0977.firebaseapp.com","messagingSenderId":"333423519125","measurementId":"G-M420BG2H99"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
