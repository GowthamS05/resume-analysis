import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { interval, takeWhile } from 'rxjs';
import { DownloadReportService } from '../../../../services/download-report.service';

@Component({
  selector: 'app-jd-score-dashboard-content',
  imports: [CommonModule],
  templateUrl: './jd-score-dashboard-content.component.html',
  styleUrl: './jd-score-dashboard-content.component.css'
})
export class JdScoreDashboardContentComponent {
  @Input() data:any
  relevance: number = 0;
  overallScore:number=0;
  downloadReportService = inject(DownloadReportService);
  @Input()reportDOM!: any;

  ngOnInit(){
    this.animateScore();
  }

    animateScore(): void {
      const duration = 1000; // Animation duration in ms
      const frameRate = 30; // Number of updates per second
      const steps = Math.ceil((duration / 1000) * frameRate); // Ensure at least 30 steps
  
      const overallStep = Math.ceil(this.data.score / steps);
      const relevance = Math.ceil(this.data.relevance/ steps);
  
      interval(1000 / frameRate)
        .pipe(takeWhile(() => !this.animationCompleted()))
        .subscribe(() => {
          this.overallScore = Math.min(this.overallScore + overallStep, this.data.score);
          this.relevance = Math.min(this.relevance + relevance, this.data.relevance);});
    }
  
    private animationCompleted(): boolean {
      return (
        this.overallScore >= this.data.overall &&
        this.relevance >= this.data.relevance
      );
    }
    downloadReport(): void {
      this.downloadReportService.generatePDF(this.reportDOM,"jd-report.pdf");
    }
}
