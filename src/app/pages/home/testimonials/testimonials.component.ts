import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Testimonials } from "../../../models/testimonials.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-testimonials",
  imports: [CommonModule],
  templateUrl: "./testimonials.component.html",
  styleUrl: "./testimonials.component.css",
})
export class TestimonialsComponent {
  @ViewChild('testimonialTrack', { static: false }) testimonialTrack!: ElementRef;
  @ViewChild('testimonialDots', { static: false }) testimonialDots!: ElementRef;
  currentSlide: number = 0;
  autoSlideInterval: any;
  testimonials: Testimonials[] = [
    {
      role: "Software Developer",
      index: 0,
      author: "Michelle Lee",
      image:
        "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
      quote:
        "The ATS scoring feature helped me understand why I wasn't getting callbacks. After implementing the suggestions, I got three interview calls in a week!",
    },
    {
      role: "Principal Engineer",
      author: "Joe Root",
      index: 1,

      image:
        "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png",

      quote:
        "The job match analysis was spot on! It helped me tailor my resume for each application, and I finally landed my dream tech role.",
    },
    {
      role: "Software Engineer",
      author: "Michael Chen",
      index: 2,
      image:
        "https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-man-avatar-isolated-png-image_9935819.png",
      quote:
        "As someone returning to the workforce after a break, the resume structure feedback was invaluable. It helped me modernize my resume and highlight my skills effectively.",
    },
  ];


  ngAfterViewInit(): void {
    this.setupDotNavigation();
    this.startAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    const track = this.testimonialTrack.nativeElement as HTMLElement;
    track.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    // Update active dot
    const dots = this.testimonialDots.nativeElement.querySelectorAll('.testimonial-dot');
    dots.forEach((dot: HTMLElement, i: number) => {
      dot.classList.toggle('active', i === this.currentSlide);
    });
  }

  setupDotNavigation() {
    const dots = this.testimonialDots.nativeElement.querySelectorAll('.testimonial-dot');
    dots.forEach((dot: HTMLElement) => {
      dot.addEventListener('click', () => {
        this.goToSlide(parseInt(dot.dataset['index'] || '0', 10));
      });
    });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
      this.goToSlide(this.currentSlide);
    }, 2000);
  }
}
