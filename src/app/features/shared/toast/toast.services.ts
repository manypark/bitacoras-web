import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  
  success(title: string, description?: string) {
    document.dispatchEvent(new CustomEvent('basecoat:toast', {
      detail: {
        config: {
          category: 'success',
          title,
          description,
          cancel: {
            label: 'Cerrar'
          }
        }
      }
    }));
  }

  error(title: string, description?: string) {
    document.dispatchEvent(new CustomEvent('basecoat:toast', {
      detail: {
        config: {
          category: 'error',
          title,
          description,
          cancel: {
            label: 'Cerrar'
          }
        }
      }
    }));
  }

  info(title: string, description?: string) {
    document.dispatchEvent(new CustomEvent('basecoat:toast', {
      detail: {
        config: {
          category: 'info',
          title,
          description,
          cancel: {
            label: 'Cerrar'
          }
        }
      }
    }));
  }
}
