export class DescriptionVO {
  private readonly value: string;

  constructor(value: string) {
    const cleanedValue = value.trim();

    if (!cleanedValue) {
      throw new Error('La descripción de la tarea no puede estar vacío.');
    }

    if (cleanedValue.length < 4) {
      throw new Error('La descripción debe tener al menos 4 caracteres.');
    }

    if (cleanedValue.length > 250) {
      throw new Error('La descripción debe ser menor de 250 caracteres.');
    }

    this.value = cleanedValue;
  }

  public getValue = (): string => this.value;

  public toString = (): string => this.value;
}