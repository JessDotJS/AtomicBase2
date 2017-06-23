import { Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { SchemaComponent } from '../../components/schema/schema.component';
import { CrudComponent } from '../../components/crud/crud.component';
import { PriorityComponent } from '../../components/priority/priority.component';
import { StorageComponent } from '../../components/storage/storage.component';


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
    },
    {
        path: 'priority',
        component: PriorityComponent,
        data: {
            meta: {
                title: 'Priority Testing',
                description: 'Some tests'
            }
        }
    },
    {
        path: 'storage',
        component: StorageComponent,
        data: {
            meta: {
                title: 'Storage Testing',
                description: 'Some tests'
            }
        }
    }
];
