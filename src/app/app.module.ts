import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NgxFileRequiredDemoComponent } from './pages/root/ngx-file-required-demo.component';
import { NgxFileRequiredModule } from '../../projects/ngx-file-required/src/lib/ngx-file-required.module';

@NgModule({
  declarations: [
    AppComponent,
    NgxFileRequiredDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxFileRequiredModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
