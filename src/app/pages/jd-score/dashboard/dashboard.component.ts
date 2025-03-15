import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { JdScoreDashboardHeaderComponent } from './jd-score-dashboard-header/jd-score-dashboard-header.component';
import { JdScoreDashboardContentComponent } from './jd-score-dashboard-content/jd-score-dashboard-content.component';
import { StorageService } from '../../../services/storage.service';
import { CommonModule } from '@angular/common';
import { JDAnalysisResult } from '../../../models/agent.model';

@Component({
  selector: 'app-jd-score-dashboard',
  imports: [JdScoreDashboardHeaderComponent,JdScoreDashboardContentComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class JDScoreDashboardComponent {
   @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;
 
   private storageService = inject(StorageService);
 
   public data = signal<JDAnalysisResult | null>(null);
 
   constructor() {
     let value = this.storageService.getData('jd_score')
     this.data.update((c) => (value));
     window.scrollTo({ top: 0, behavior: 'smooth' });
   }
   
  

}
