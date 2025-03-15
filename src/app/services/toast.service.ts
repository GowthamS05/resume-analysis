import { inject, Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastr = inject(ToastrService);

  private toastConfig: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 5000,
    extendedTimeOut: 1000,
    disableTimeOut: false,
    easing: 'linear',
    easeTime: 300,
    enableHtml: false,
    newestOnTop: true,
    progressBar: true,
    progressAnimation: 'decreasing', // Fixed type
    toastClass: 'ngx-toastr custom-toast-class',
    positionClass: 'toast-top-right',
    titleClass: 'toast-title custom-title-class',
    messageClass: 'toast-message custom-message-class',
    tapToDismiss: true,
    onActivateTick: false
  };

  showSuccess(message: string, heading: string,toastConfig: Partial<IndividualConfig> = this.toastConfig) {
    this.toastr.success(message, heading, toastConfig);
  }

  showError(message: string, heading: string,toastConfig: Partial<IndividualConfig> = this.toastConfig) {
    this.toastr.error(message, heading, toastConfig);
  }

  showWarning(message: string, heading: string,toastConfig: Partial<IndividualConfig> = this.toastConfig) {
    this.toastr.warning(message, heading, toastConfig);
  }

  showInfo(message: string, heading: string,toastConfig: Partial<IndividualConfig> = this.toastConfig) {
    this.toastr.info(message, heading, toastConfig);
  }
  
}
