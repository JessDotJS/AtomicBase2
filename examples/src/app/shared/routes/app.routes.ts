import { Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { SchemaComponent } from '../../components/schema/schema.component';
import { CrudComponent } from '../../components/crud/crud.component';
import { PriorityComponent } from '../../components/priority/priority.component';
import { StorageComponent } from '../../components/storage/storage.component';
import { AtomicArrayComponent } from '../../components/atomic-array/atomic-array.component';
import { AtomicObjectComponent } from '../../components/atomic-object/atomic-object.component';


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
    },
    {
        path: 'atomicArray',
        component: AtomicArrayComponent,
        data: {
            meta: {
                title: 'AtomicArray Testing',
                description: 'Some tests'
            }
        }
    },
    {
        path: 'atomicObject',
        component: AtomicObjectComponent,
        data: {
            meta: {
                title: 'AtomicObject Testing',
                description: 'Some tests'
            }
        }
    }
];
