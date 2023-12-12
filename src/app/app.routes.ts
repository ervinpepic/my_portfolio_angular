import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CertificatesComponent } from './components/certificates/certificates.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'certificates', component: CertificatesComponent },
];
