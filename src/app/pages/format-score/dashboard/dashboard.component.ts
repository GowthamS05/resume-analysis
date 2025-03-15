import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormatScoreHeaderComponent } from './format-score-header/format-score-header.component';
import { FormatScoreContentComponent } from './format-score-content/format-score-content.component';
import { ResumeFormatResult } from '../../../models/agent.model';
import { StorageService } from '../../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-format-score-dashboard',
  imports: [CommonModule,FormatScoreHeaderComponent,FormatScoreContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class FormatScoreDashboardComponent {

  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;

  private storageService = inject(StorageService);

  public data = signal<ResumeFormatResult | null>(null);

  constructor() {
    let value = this.storageService.getData('format_score')
    this.data.update((c) => (value));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
