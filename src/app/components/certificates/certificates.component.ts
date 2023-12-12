import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { SkeletonCardComponent } from '../skeleton/skeleton-card.component';
import { FirebaseService } from '../../firebase/firebase.service';
import { School } from '../../Certification';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeletonCardComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css',
})
export class CertificatesComponent implements OnInit {

  @ViewChild('scrollTop', { static: true }) scroll?: ElementRef;

  constructor(private firebaseService: FirebaseService) {}

  loading = true;
  scrollPosition = 0;
  showScrollToTopButton = false;

  certificates: School[] = [];

  ngOnInit(): void {
    this.fetchCertificates();
  }

  ///place for adding a certificates later

  fetchCertificates(): void {
    try {
      this.firebaseService.getCertificates().subscribe((certificate) => {
        this.certificates = certificate;
        this.loading = false
      });      
    } catch (error) {
      console.log("Sorry, currently we can't fetch certificates: ", error);
      this.loading = false;
    } 
  }

  onScrollToTop(): void {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.showScrollToTopButton = this.scrollPosition > 450;
  }
}
