import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AtsDashboardHeaderComponent } from './ats-dashboard-header/ats-dashboard-header.component';
import { AtsDashboardContentComponent } from './ats-dashboard-content/ats-dashboard-content.component';
import { StorageService } from '../../../services/storage.service';
import { ATSAnalysisResult } from '../../../models/agent.model';

@Component({
  selector: 'app-ats-dashboard',
  imports: [CommonModule, AtsDashboardHeaderComponent, AtsDashboardContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class ATSDashboardComponent {
  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;

  private storageService = inject(StorageService);

  public data = signal<ATSAnalysisResult | null>(null);

  constructor() {
    let value = this.storageService.getData('ats_score')
    this.data.update((c) => (value));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
