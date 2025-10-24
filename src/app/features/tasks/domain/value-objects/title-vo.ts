export class TitleVO {
  private readonly value: string;

  constructor(value: string) {
    const cleanedValue = value.trim();

    if (!cleanedValue) {
      throw new Error('El título de la tarea no puede estar vacío.');
    }

    if (cleanedValue.length < 4) {
      throw new Error('La tarea debe tener al menos 4 caracteres.');
    }

    if (cleanedValue.length > 150) {
      throw new Error('La tarea debe ser menor de 150 caracteres.');
    }

    this.value = cleanedValue;
  }

  public getValue = (): string => this.value;

  public toString = (): string => this.value;
}