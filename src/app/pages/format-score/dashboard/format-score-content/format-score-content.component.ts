import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { interval, takeWhile } from 'rxjs';
import { DownloadReportService } from '../../../../services/download-report.service';

@Component({
  selector: 'app-format-score-content',
  imports: [CommonModule],
  templateUrl: './format-score-content.component.html',
  styleUrl: './format-score-content.component.css'
})
export class FormatScoreContentComponent {
  @Input() data:any
  @Input()reportDOM!: any;
  completeness: number = 0;
  readability:number=0;
  downloadReportService = inject(DownloadReportService);
    
  
    ngOnInit(){
      this.animateScore();
    }
  
      animateScore(): void {
        const duration = 1000; // Animation duration in ms
        const frameRate = 30; // Number of updates per second
        const steps = Math.ceil((duration / 1000) * frameRate); // Ensure at least 30 steps
    
        const readability = Math.ceil(this.data.readability / steps);
        const completeness = Math.ceil(this.data.completeness/ steps);
    
        interval(1000 / frameRate)
          .pipe(takeWhile(() => !this.animationCompleted()))
          .subscribe(() => {
            this.readability = Math.min(this.readability + readability, this.data.readability);
            this.completeness = Math.min(this.completeness + completeness, this.data.completeness);});
      }
    
      private animationCompleted(): boolean {
        return (
          this.readability >= this.data.readability &&
          this.completeness >= this.data.completeness
        );
      }

      downloadReport(): void {
        this.downloadReportService.generatePDF(this.reportDOM,"format-report.pdf");
      }

}
