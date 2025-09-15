export interface BackendError {
  status    : boolean;
  message   : string;
  data      : any;
}

export function getBackendErrorMessage(err: unknown): string {
  // Si es un HttpErrorResponse de Angular
  if ((err as any)?.error) {
    const backendError = (err as any).error as BackendError;
    return backendError?.message ?? 'Error desconocido';
  }

  // fallback genérico
  return (err as any)?.message ?? 'Error desconocido';
}
