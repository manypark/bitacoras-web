import { Observable } from 'rxjs';
import { inject, signal } from '@angular/core';

import { ToastService } from '@app/shared/toast';

export abstract class RoleDialogBaseComponent {
  /** Signal storing the current error message, if any. */
  errValue = signal<string>('');
  /** Signal indicating whether an operation is in progress. */
  isLoading = signal<boolean>(false);

  /** Injected toast service used to display feedback messages. */
  protected toast = inject(ToastService);

  /**
   * Performs the specific asynchronous operation and returns an observable
   * representing its completion. Subclasses must implement this method.
   */
  protected abstract performOperation(): Observable<unknown>;

  /**
   * Returns the title for the success toast. Subclasses should override
   * this to provide context-specific headings.
   */
  protected abstract successTitle(): string;

  /**
   * Returns a secondary message for the success toast, such as the
   * affected role's name. Can return undefined if no subtitle is needed.
   */
  protected abstract successMessage(): string | undefined;

  /**
   * Returns the DOM id of the dialog element to close. Subclasses must
   * override this to target the correct modal.
   */
  protected abstract modalId(): string;

  /**
   * Emits the result of the operation. Because the `output()` API can only
   * be used within a `@Component` or `@Directive`-decorated class, the base
   * class cannot declare an `output()` property directly. Instead, each
   * subclass must implement this method and delegate to its own
   * `output()`-generated emitter (e.g. `roleUpdated.emit(value)`).
   *
   * @param value Indicates whether the operation succeeded.
   */
  protected abstract emitResult(value: boolean): void;

  /**
   * Optional hook invoked when the dialog is closed. Subclasses can
   * override this to clear state (e.g., reset a form or selection).
   */
  protected onClose(): void {}

  /**
   * Template method that orchestrates the asynchronous operation. It
   * sets the loading flag, executes the operation, displays success
   * or error toasts, emits the result and closes the dialog. See
   * Template Method design pattern for details【840843496196993†L40-L59】.
   */
  submit(): void {
    this.isLoading.set(true);
    try {
      this.performOperation().subscribe({
        next: () => {
          this.toast.success(this.successTitle(), this.successMessage());
          this.emitResult(true);
          this.isLoading.set(false);
          this.close();
        },
        error: (err:any) => {
          // Update state and notify subscribers
          this.errValue.set(String(err));
          this.toast.error('Error', err ?? 'Error processing request');
          this.emitResult(false);
          this.isLoading.set(false);
        },
        complete: () => {
          // Ensure isLoading is reset even if the observable completes without emitting
          this.isLoading.set(false);
        },
      });
    } catch (err:any) {
      // Synchronously thrown errors are handled here
      this.errValue.set(String(err));
      this.toast.error('Error', err ?? 'Error processing request');
      this.emitResult(false);
      this.isLoading.set(false);
    }
  }

  /**
   * Closes the dialog and resets error state. Delegates to onClose()
   * for subclass-specific cleanup logic.
   */
  close(): void {
    // close the dialog
    const modal = document.getElementById(this.modalId()) as HTMLDialogElement | null;
    modal?.close();
    // reset error state
    this.errValue.set('');
    // invoke subclass-specific cleanup
    this.onClose();
  }
}