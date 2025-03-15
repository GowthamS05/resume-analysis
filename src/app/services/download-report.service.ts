  import { Injectable } from '@angular/core';
  import html2canvas from 'html2canvas';
  import { jsPDF } from 'jspdf';
  
  @Injectable({
    providedIn: 'root'
  })
  export class DownloadReportService {
    
      async generatePDF(element: HTMLElement, fileName: string = 'report.pdf'): Promise<void> {
        if (!element) {
          console.error('Invalid element provided for PDF generation.');
          return;
        }
    
        // Select items to hide (Example: Buttons, Ads, or any class like `.no-print`)
        const elementsToHide = element.querySelectorAll('.action-buttons');
    
        // Hide elements
        elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');
    
        try {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: null
          });
    
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const pageHeight = 297;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let position = 0;
    
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    
          while (position + imgHeight > pageHeight) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          }
    
          pdf.save(fileName);
        } catch (error) {
          console.error('Error generating PDF:', error);
        } finally {
          // Restore hidden elements after PDF generation
          elementsToHide.forEach(el => (el as HTMLElement).style.display = '');
        }
      }

    }

