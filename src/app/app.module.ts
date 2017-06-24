/*
 * Angular
 * */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';




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
/*import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';*/
import * as firebase from 'firebase';


/*
 * Environment Variables
 * */
import { environment } from '../environments/environment';


/*
 * Components
 * */

// Root Component
import { AppComponent } from './app.component';

// Components Component
import { CrudComponent } from './components/crud/crud.component';
import { SchemaComponent } from './components/schema/schema.component';
import { PriorityComponent } from './components/priority/priority.component';
import { StorageComponent } from './components/storage/storage.component';
import { AtomicArrayComponent } from './components/atomic-array/atomic-array.component';
import { AtomicObjectComponent } from './components/atomic-object/atomic-object.component';




firebase.initializeApp(environment.firebase);




@NgModule({
    declarations: [
        TranslatePipe,
        AppComponent,
        CrudComponent,
        SchemaComponent,
        PriorityComponent,
        StorageComponent,
        AtomicArrayComponent,
        AtomicObjectComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        Ng2PageScrollModule.forRoot(),
        RouterModule.forRoot(routes),
        MetaModule.forRoot(),
        // AngularFireModule.initializeApp(environment.firebase)

    ],
    providers: [ TRANSLATION_PROVIDERS, TranslateService],
    bootstrap: [AppComponent]
})
export class AppModule { }