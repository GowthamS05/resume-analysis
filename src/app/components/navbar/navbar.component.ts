import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  private storageService = inject(StorageService)
  showAtsMenu:boolean=false;
  showJDMenu:boolean=false;
  showFormatMenu:boolean=false;
  showOverallMenu:boolean=false;

  constructor(private el: ElementRef, private renderer: Renderer2, private router:Router) {



  }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showAtsMenu=this.storageService.getData('ats_score')?true:false
      this.showJDMenu=this.storageService.getData('jd_score')?true:false
      this.showFormatMenu=this.storageService.getData('format_score')?true:false
      this.showOverallMenu=this.storageService.getData('overall_score')?true:false
     
    });
  }

 


  // ✅ Toggle menu open/close
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    const navLinks = this.el.nativeElement.querySelector('.nav-links');
    if (this.isMenuOpen) {
      this.renderer.addClass(navLinks, 'slide-down');
      this.renderer.removeClass(navLinks, 'slide-up');
    } else {
      this.renderer.addClass(navLinks, 'slide-up');
      setTimeout(() => this.renderer.removeClass(navLinks, 'slide-down'), 300); // Wait for animation to complete
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    const navLinks = this.el.nativeElement.querySelector('.nav-links');
    this.renderer.addClass(navLinks, 'slide-up');
    setTimeout(() => this.renderer.removeClass(navLinks, 'slide-down'), 300);
  }

}
