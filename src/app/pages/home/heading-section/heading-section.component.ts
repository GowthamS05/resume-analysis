import { Component } from '@angular/core';

@Component({
  selector: 'app-heading-section',
  imports: [],
  templateUrl: './heading-section.component.html',
  styleUrl: './heading-section.component.css'
})
export class HeadingSectionComponent {
  scrollToStart(event: Event) {
    event.preventDefault();
    const startElement = document.getElementById('start');
    if (startElement) {
      startElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
