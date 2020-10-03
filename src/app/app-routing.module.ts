import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HouseComponent } from './pages/house/house.component'
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { InformationComponent } from './pages/information/information.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BookingComponent } from './pages/booking/booking.component';
import { FooterComponent } from './pages/footer/footer.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'house', component: HouseComponent},
  {path: 'navbar', component: NavBarComponent},
  {path: 'information', component: InformationComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'footer', component: FooterComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'house'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
