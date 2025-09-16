export class FirstNameVO {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }

    if(value.length <= 4) {
        throw new Error('El nombre debe de tener al menos 4 carácteres');
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }
}
