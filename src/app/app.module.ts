import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketsComponent } from "./components/tickets/tickets.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SessionsComponent} from "./_components/sessions/sessions.component";
import {ToastService} from "./_services/toast-service";
import {ToastsContainer} from "./_components/toasts/toasts.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent,
    SessionsComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
