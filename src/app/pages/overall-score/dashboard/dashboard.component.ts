import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { OverallDashboardHeaderComponent } from './overall-dashboard-header/overall-dashboard-header.component';
import { OverallDashboardContentComponent } from './overall-dashboard-content/overall-dashboard-content.component';
import { StorageService } from '../../../services/storage.service';
import { ATSAnalysisResult, FeedbackResult, JDAnalysisResult, OverallResult, ResumeFormatResult } from '../../../models/agent.model';

@Component({
  selector: 'app-overall--dashboard',
  imports: [OverallDashboardHeaderComponent, OverallDashboardContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class OverallDashboardComponent {

  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;

  private storageService = inject(StorageService);
  public data = signal<OverallResult | null>(null);
  public ats_score:ATSAnalysisResult
  public jd_score:JDAnalysisResult
  public format_score:ResumeFormatResult
  public overall_score:FeedbackResult
   constructor() {
     let value = this.storageService.getData('overall_score')
     this.data.update((c) => (value));
     const currentData = this.data();
     this.ats_score = currentData?.ats_score ?? {} as ATSAnalysisResult;
     this.jd_score = currentData?.jd_score ?? {} as JDAnalysisResult;
     this.format_score = currentData?.format_score ?? {} as ResumeFormatResult;
     this.overall_score = currentData?.overall ?? {} as FeedbackResult;
     window.scrollTo({ top: 0, behavior: 'smooth' });
   }

    


}
