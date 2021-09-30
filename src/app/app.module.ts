import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './site-framework/header/header.component';
import { SiderailComponent } from './site-framework/siderail/siderail.component';
import { DetailComponent } from './site-framework/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SiderailComponent,
    DetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
