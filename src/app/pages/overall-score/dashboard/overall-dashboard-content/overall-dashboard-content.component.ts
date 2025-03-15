import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { interval, takeWhile } from 'rxjs';
import { DownloadReportService } from '../../../../services/download-report.service';
import { ATSAnalysisResult, FeedbackResult, JDAnalysisResult, ResumeFormatResult } from '../../../../models/agent.model';

@Component({
  selector: 'app-overall-dashboard-content',
  imports: [CommonModule],
  templateUrl: './overall-dashboard-content.component.html',
  styleUrl: './overall-dashboard-content.component.css'
})
export class OverallDashboardContentComponent {
  @Input() ats_score!: ATSAnalysisResult;
  @Input() jd_score!:JDAnalysisResult ;
  @Input() format_score!: ResumeFormatResult;
  @Input() overall_score!: FeedbackResult;
  downloadReportService = inject(DownloadReportService);
  @Input()reportDOM!: any;


  atsScore: number = 0;
  overallScore: number = 0;
  jdScore: number = 0;
  formatScore: number = 0;

  ngOnInit() {
    this.animateScore();
  }

  animateScore(): void {
    const duration = 1000; // Animation duration in ms
    const frameRate = 30; // Number of updates per second
    const steps = Math.ceil((duration / 1000) * frameRate); // Ensure at least 30 steps

    const overallStep = Math.ceil(this.overall_score.overall_score / steps);
    const atsStep = Math.ceil(this.ats_score.overall / steps);
    const jdStep = Math.ceil(this.jd_score.score / steps);
    const formatStep = Math.ceil(this.format_score.completeness / steps);



    interval(1000 / frameRate)
      .pipe(takeWhile(() => !this.animationCompleted()))
      .subscribe(() => {
        this.atsScore = Math.min(this.atsScore + atsStep, this.ats_score.overall);
        this.jdScore = Math.min(this.jdScore + jdStep, this.jd_score.score);
        this.overallScore = Math.min(this.overallScore + overallStep, this.overall_score.overall_score);
        this.formatScore = Math.min(this.formatScore + formatStep, this.format_score.completeness );
      });
  }

  private animationCompleted(): boolean {
    return (
      this.overallScore >= this.overall_score.overall_score &&
      this.formatScore >= this.format_score.completeness  &&
      this.atsScore >= this.ats_score.overall &&
      this.jdScore >= this.jd_score.score
    );
  }
  downloadReport(){
    this.downloadReportService.generatePDF(this.reportDOM,"Overall-report.pdf");

  }


}
