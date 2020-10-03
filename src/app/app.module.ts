//Angular
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Module
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/calendar';

//Component
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HouseComponent } from './pages/house/house.component';
import { InformationComponent } from './pages/information/information.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

//Service
import { TranslateService } from './shared/translate.service';
//Pipe
import { TranslatePipe } from './pipes/translate.pipe';


export function translateFactory(provider:TranslateService){
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HouseComponent,
    InformationComponent,
    ContactComponent,
    BookingComponent,
    NavBarComponent,
    FooterComponent,
    GalleryComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModule,
    CalendarModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
