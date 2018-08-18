import { NgModule } from '@angular/core';
import {  Routes, RouterModule  } from '@angular/router';

import { AppComponent } from './app.component';

import { NgxFileRequiredDemoComponent } from './pages/root/ngx-file-required-demo.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path:      '',
                component: NgxFileRequiredDemoComponent
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ],
    providers: []
})
export class AppRoutingModule {}
