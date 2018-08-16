import { NgModule } from '@angular/core';
import {  Routes, RouterModule  } from '@angular/router';

import { AppComponent } from './app.component';

import { NgxFileRequiredDemoComponent } from './pages/required/ngx-file-required-demo.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path:      'required',
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
