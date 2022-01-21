import React from 'react';
import ReactDOM from 'react-dom';
import Toast, { ErrorToastProps } from './ErrorToast';

interface ErrorToastOptions {
  content?: string;
  duration?: number;
  id?: string;
  title?: string;
  type: 'error' | 'success';
}

export class ErrorToastManager {
  private containerRef: HTMLDivElement;
  private toasts: ErrorToastProps[] = [];

  constructor() {
    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
    const toastContainer = document.createElement('div') as HTMLDivElement;
    toastContainer.id = 'toast-container-main';
    body.insertAdjacentElement('beforeend', toastContainer);
    this.containerRef = toastContainer;
  }

  public show(options: ErrorToastOptions): void {
    const toastId = Math.random().toString(36).substring(2, 9);
    const toast: ErrorToastProps = {
      id: toastId,
      ...options, // if id is passed within options, it will overwrite the auto-generated one
      destroy: () => this.destroy(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ErrorToastProps) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: ErrorToastProps) => <Toast key={toastProps.id} {...toastProps} />);
    ReactDOM.render(toastsList, this.containerRef);
  }
}

export const toast = new ErrorToastManager();
