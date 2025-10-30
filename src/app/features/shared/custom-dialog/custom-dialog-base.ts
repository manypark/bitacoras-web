import { toast } from 'ngx-sonner';
import { signal } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';

export abstract class CustomDialogBaseComponent<TData = unknown> {
  /** Señales de estado */
  errValue = signal<string>('');
  isLoading = signal<boolean>(false);

  /** Servicio de toasts */
  protected readonly toast = toast;

  /** Debe implementar la operación principal */
  protected abstract performOperation(): Promise<TData>;

  /** Título del toast de éxito */
  protected abstract successTitle(): string;

  /** Mensaje secundario del toast */
  protected abstract successMessage(): string | undefined;

  /** Id del modal */
  protected abstract modalId(): string;

  /** Emite resultado al padre */
  protected abstract emitResult(success: boolean): void;

  /** Hook opcional para limpiar estado */
  protected onClose(): void {}

  /** Mutation central */
  private mutation = injectMutation(() => ({
    mutationFn  : async () => await this.performOperation(),
    onMutate    : () => {
      this.isLoading.set(true);
      this.errValue.set('');
    },
    onSuccess   : () => {
      this.toast.success(this.successTitle(), { description: this.successMessage() });
      this.emitResult(true);
      this.close();
    },
    onError     : (error: any) => {
      const message = typeof error === 'string' ? error : error?.message ?? 'Error processing request';
      this.errValue.set(message);
      this.toast.error('Error', { description: message });
      this.emitResult(false);
    },
    onSettled: () => { this.isLoading.set(false); },
  }));

  /** Método genérico para lanzar la operación */
  submit = () => this.mutation.mutate();

  /** Cierra el diálogo */
  protected close(): void {
    const modal = document.getElementById( this.modalId() ) as HTMLDialogElement | null;
    modal?.close();
    this.errValue.set('');
    this.isLoading.set(false);
  }
}