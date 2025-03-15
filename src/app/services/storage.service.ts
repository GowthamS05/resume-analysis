import { Injectable } from '@angular/core';
import { ATSAnalysisResult, FeedbackResult, FinalAnalysis, JDAnalysisResult, OverallResult, ResumeFormatResult } from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public analyseData:FinalAnalysis = {}; // Initialize as an empty object

setData(key: string, data: ATSAnalysisResult | FeedbackResult | ResumeFormatResult | JDAnalysisResult | OverallResult): void {
    this.analyseData[key] = data;
  }

  getData(key: string): any {
    return this.analyseData[key] ?? null;
  }

  clearData(key: string): void {
    delete this.analyseData[key];
  }

  clearAll(): void {
    this.analyseData = {};
  }
}
