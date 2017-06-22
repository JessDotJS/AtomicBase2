import { Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { SchemaComponent } from '../../components/schema/schema.component';
import { CrudComponent } from '../../components/crud/crud.component';


// Route Configuration
export const routes: Routes = [
    {
        path: '',
        component: SchemaComponent,
        data: {
            meta: {
                title: 'Schema Testing',
                description: 'Some tests'
            }
        }
    },
    {
        path: 'schema',
        component: SchemaComponent,
        data: {
            meta: {
                title: 'Schema Testing',
                description: 'Some tests'
            }
        }
    },
    {
        path: 'crud',
        component: CrudComponent,
        data: {
            meta: {
                title: 'Schema Testing',
                description: 'Some tests'
            }
        }
    }
];
