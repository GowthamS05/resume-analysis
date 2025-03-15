import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input } from '@angular/core';
import { interval, takeWhile } from 'rxjs';
import { DownloadReportService } from '../../../../services/download-report.service';

@Component({
  selector: 'app-ats-dashboard-content',
  imports: [CommonModule],
  templateUrl: './ats-dashboard-content.component.html',
  providers: [DownloadReportService],
  styleUrl: './ats-dashboard-content.component.css'
})
export class AtsDashboardContentComponent {
  @Input() data: any;
  @Input()reportDOM!: any;
  grammarScore: number = 0;
  overallScore:number=0;
  readabilityScore: number = 0;
  downloadReportService = inject(DownloadReportService);
  ngOnInit(){
    this.animateScore();

  }

  animateScore(): void {
    const duration = 2000; // Animation duration in ms
    const frameRate = 30; // Number of updates per second
    const steps = Math.ceil((duration / 1000) * frameRate); // Ensure at least 30 steps

    const overallStep = Math.ceil(this.data.overall / steps);
    const grammar = Math.ceil(this.data.grammar_score / steps);
    const readability = Math.ceil(this.data.readability_score.length / steps);

    interval(1000 / frameRate)
      .pipe(takeWhile(() => !this.animationCompleted()))
      .subscribe(() => {
        this.overallScore = Math.min(this.overallScore + overallStep, this.data.overall);
        this.grammarScore = Math.min(this.grammarScore + grammar, this.data.grammar_score);
        this.readabilityScore = Math.min(this.readabilityScore + grammar, this.data.readability_score);
      });
  }

  private animationCompleted(): boolean {
    return (
      this.overallScore >= this.data.overall &&
      this.grammarScore >= this.data.grammar_score &&
      this.readabilityScore >= this.data.readability_score
    );
  }
  downloadReport(): void {
    this.downloadReportService.generatePDF(this.reportDOM,"ats-report.pdf");
  }

}
