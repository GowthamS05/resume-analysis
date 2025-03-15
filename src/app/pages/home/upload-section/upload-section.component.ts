import { CommonModule } from "@angular/common";
import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import * as pdfjsLib from 'pdfjs-dist';
import { ToastService } from "../../../services/toast.service";
import { ATSScoreService } from "../../../agents/ats-score.service";
import { CommonService } from "../../../services/common.service";
import { JDMatchService } from "../../../agents/jd-score.service";
import { ResumeFormatService } from "../../../agents/format-score.service";
import { OverallScoreService } from "../../../agents/overall-score.service";
import { forkJoin, Observable } from "rxjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.mjs';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { StorageService } from "../../../services/storage.service";


@Component({
  selector: "app-upload-section",
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./upload-section.component.html",
  styleUrl: "./upload-section.component.css",
})
export class UploadSectionComponent {
  apiKeyForm: FormGroup;
  isValidateResumeLoading = false;
  analysisLoading = false;
  validationInfo = {
    valid: false,
    message: ''

  };
  @ViewChild("analyzeBtn", { static: false })
  analyzeBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild("fileInput", { static: false })
  fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  errorMessage: string = "";
  private toastService = inject(ToastService);
  private commonService = inject(CommonService);
  private atsService = inject(ATSScoreService);
  private jdMatchService = inject(JDMatchService);
  private formatScoreService = inject(ResumeFormatService)
  private overallScoreService = inject(OverallScoreService)
  private storageService = inject(StorageService)
  private router = inject(Router)

  private extractedPdfContent: string = "";
  public jobDescription: string = '';
  analysisOptions: any = {
    ats_score: true,
    match: false,
    structure: false,
    overall: false,
  };

  constructor(private fb: FormBuilder) {
    this.apiKeyForm = this.fb.group({
      apiKey: ['', [Validators.required]]
    });
  }

  get apiKey() {
    return this.apiKeyForm.get('apiKey');
  }

  async validateKey() {
    this.isValidateResumeLoading = true;
    this.validationInfo = {
      valid: false,
      message: ''

    };
    if (await this.commonService.validateToken(this.apiKey?.value)) {
      this.validationInfo.valid = true;
      this.validationInfo.message = 'Success: API key is valid'
      this.toastService.showSuccess('API key is valid', 'Success')
    }
    else {
      this.validationInfo.valid = false;
      this.validationInfo.message = 'Failure: API key is invalid'
      this.toastService.showError('Invalid API key ,Please try again', 'Failure')

    }
    this.isValidateResumeLoading = false;


  }


  toggleOption(option: keyof typeof this.analysisOptions) {
    if (option === "overall") {
      this.analysisOptions = {
        ats_score: false,
        match: false,
        structure: false,
        overall: !this.analysisOptions.overall,
      };
    }
    else if (option === "ats_score") {
      this.analysisOptions = {
        ats_score: !this.analysisOptions.ats_score,
        match: false,
        structure: false,
        overall: false,
      };
    }
    else if (option === "match") {
      this.analysisOptions = {
        ats_score: false,
        match: !this.analysisOptions.match,
        structure: false,
        overall: false,
      };
    }
    else if (option === "structure") {
      this.analysisOptions = {
        ats_score: false,
        match: false,
        structure: !this.analysisOptions.structure,
        overall: false,
      };
    }
  }
  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.validateFile(file);
      this.readPdfContent(file);

    }
    setTimeout(() => {
      input.value = '';
    }, 0);
  }

  validateFile(file: File) {
    this.errorMessage = "";

    if (file.type !== "application/pdf") {
      this.errorMessage = "Please upload a PDF file.";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = "File size exceeds the 5MB limit.";
      return;
    }

    this.selectedFile = file;
  }

  removeFile() {
    this.toastService.showSuccess(`${this.selectedFile?.['name']} removed successfully`, 'Success');

    this.selectedFile = null;
  }

  analyzeResume() {
    this.analysisLoading = true;
    if (!this.validateForm()) {
      this.analysisLoading = false;
      return;
    }
    let analysisRequest: Observable<any>;
    if (this.analysisOptions.ats_score) {
      analysisRequest = this.atsService.generateAtsScore(
        this.extractedPdfContent,
        this.apiKey!.value
      );
    } else if (this.analysisOptions.match) {
      if (this.jobDescription.length) {
        analysisRequest = this.jdMatchService.analyzeJobDescription(
          this.extractedPdfContent,
          this.jobDescription,
          this.apiKey!.value
        );
      } else {
        this.toastService.showError('Job description required for matching', 'Validation');
        this.analysisLoading = false;
        return;
      }
    } else if (this.analysisOptions.structure) {
      analysisRequest = this.formatScoreService.generateResumeFormatScore(
        this.extractedPdfContent,
        this.apiKey!.value
      );
    } else if (this.analysisOptions.overall) {
      if (!this.jobDescription.length) {
        this.toastService.showError('Job description required for overall analysis', 'Validation');
        this.analysisLoading = false;
        return;
      }
      analysisRequest = forkJoin({
        atsScore: this.atsService.generateAtsScore(
          this.extractedPdfContent,
          this.apiKey!.value
        ),
        jobMatch: this.jdMatchService.analyzeJobDescription(
          this.extractedPdfContent,
          this.jobDescription,
          this.apiKey!.value
        ),
        formatScore: this.formatScoreService.generateResumeFormatScore(
          this.extractedPdfContent,
          this.apiKey!.value
        )
      });
    } else {
      this.toastService.showError('No analysis option selected', 'Validation');
      this.analysisLoading = false;
      return;
    }

    analysisRequest.subscribe({
      next: (result: any) => {
        console.log('Analysis Result:', result);
        if (this.analysisOptions.overall) {
          this.overallScoreService.generateFeedback(
            this.extractedPdfContent,
            this.jobDescription,
            result.atsScore,
            result.jobMatch,
            result.formatScore,
            this.apiKey!.value
          ).subscribe({
            next: (feedbackResult) => {
              console.log('Feedback Result:', feedbackResult);
              this.storageService.setData('overall_score',{
                ats_score:result['atsScore'],
                jd_score:result['jobMatch'],
                format_score:result['formatScore'],
                overall:feedbackResult
                });
              this.router.navigate(['/overall']);
              this.toastService.showSuccess('Resume analysis complete!', 'Success');
              this.analysisLoading = false;

            },
            error: (feedbackError) => {
              console.error('Feedback analysis error:', feedbackError);
              this.toastService.showError('Feedback analysis failed', 'Failure');
              this.toastService.showInfo('The response may contain inaccuracies. Please try again.', 'AI Warning');

              this.analysisLoading = false;

            }
          });
        }
        else {
          switch (true) {
            case !!this.analysisOptions.ats_score:
              this.storageService.setData('ats_score',result);
              this.router.navigate(['/ats']);
              break;
            case !!this.analysisOptions.match:
              this.storageService.setData('jd_score',result);
              this.router.navigate(['/jd']);
              break;
            case !!this.analysisOptions.structure:
              this.storageService.setData('format_score',result);
              this.router.navigate(['/format']);
              break;
          }
          this.toastService.showSuccess('Resume analysis complete!', 'Success');
          this.analysisLoading = false;

        }
      },
      error: (error: any) => {
        console.error('Analysis error:', error);
        this.toastService.showError('Resume analysis failed', 'Failure');
        this.toastService.showInfo('The response may contain inaccuracies. Please try again.', 'AI Warning');
        this.analysisLoading = false;
      }
    });
  }




  startAnimation() {
    this.analyzeBtn.nativeElement.style.animation = "pulse 1s infinite";
  }

  stopAnimation() {
    this.analyzeBtn.nativeElement.style.animation = "";
  }

  async readPdfContent(file: File) {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      this.extractedPdfContent = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        this.extractedPdfContent += text.items.map(item => (item as any).str).join(' ') + '\n';
      }

      console.log('PDF Content:', this.extractedPdfContent);
    };
    reader.readAsArrayBuffer(file);
  }

  validateForm(): boolean {
    if (!this.validationInfo.valid) {
      this.toastService.showError('Enter valid Api Key / Validate your api key before Submission', 'Validation')
      return false
    }
    else if(!this.apiKey!.value){
      this.toastService.showError('Enter API key', 'Validation')

    }
    else if (!this.selectedFile) {
      this.toastService.showError('Please upload the resume', 'Validation')
      return false

    }
    return true
  }

  ngOnDestroy(){
    this.validationInfo = {
      valid: false,
      message: ''
  
    };
  }



}
