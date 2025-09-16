export class PasswordVO {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('La contraseña no puede estar vacía');
    }

    if (value.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Debe contener: minúscula, mayúscula, número y signo
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!passwordRegex.test(value)) {
      throw new Error(
        'La contraseña debe incluir mayúscula, minúscula y número'
      );
    }

    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return '********';
  }
}
