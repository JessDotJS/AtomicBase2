/*
 * Angular
 * */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import * as firebase from 'firebase';

/*
 * Angular Material & Front-End Tools
 * */
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

/*
 * Dynamic Meta Tags
 * */
import { MetaModule } from '@ngx-meta/core';


/*
 * Languages
 * */
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService } from './shared/languages/index';


/*
 * Routing
 * */
import { routes } from './shared/routes/app.routes';



/*
 * AngularFire + AtomicBase2 + Back-End Tools
 * */
import { AngularFireModule } from 'angularfire2';



/*
 * Environment Variables
 * */
import { environment } from '../environments/environment';


/*
 * Components
 * */

// Root Component
import { AppComponent } from './app.component';

// Home Component
import { HomeComponent } from './components/home/home.component';



const config = {
    apiKey: 'AIzaSyBchNdBC4jJcVTt_u-7zgLjzxxFzzvWyTo',
    authDomain: 'atomicbase2sampleapp.firebaseapp.com',
    databaseURL: 'https://atomicbase2sampleapp.firebaseio.com',
    projectId: 'atomicbase2sampleapp',
    storageBucket: 'atomicbase2sampleapp.appspot.com',
    messagingSenderId: '1007791672205'
};
firebase.initializeApp(config);




@NgModule({
    declarations: [
        TranslatePipe,
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        Ng2PageScrollModule.forRoot(),
        MetaModule.forRoot(),
        // AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(routes),
    ],
    providers: [ TRANSLATION_PROVIDERS, TranslateService],
    bootstrap: [AppComponent]
})
export class AppModule { }