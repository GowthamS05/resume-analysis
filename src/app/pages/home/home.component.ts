import { Component } from '@angular/core';
import { UploadSectionComponent } from './upload-section/upload-section.component';
import { HeadingSectionComponent } from './heading-section/heading-section.component';

@Component({
  selector: 'app-home',
  imports: [HeadingSectionComponent,UploadSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
