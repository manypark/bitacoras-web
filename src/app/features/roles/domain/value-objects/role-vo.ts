export class RoleVO {
  private readonly value: string;

  constructor(value: string) {
    const cleanedValue = value.trim();

    if (!cleanedValue) {
      throw new Error('El nombre del rol no puede estar vacío.');
    }

    if (cleanedValue.length < 4) {
      throw new Error('El nombre del rol debe tener al menos 4 caracteres.');
    }

    this.value = cleanedValue;
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}