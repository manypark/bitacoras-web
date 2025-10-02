import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstLetter' })
export class FirstLetterPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase();
  }
}
