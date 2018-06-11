import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ContactNewComponent } from './contact/contact-new/contact-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ContactNewComponent
  ],
  imports: [
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'natePersonal'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
