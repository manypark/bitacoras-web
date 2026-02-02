import { injectMutation } from '@tanstack/angular-query-experimental';
import { ElementRef, inject, Injectable, signal, ViewChild } from '@angular/core';

import { environment } from '@environment/environment';
import { UploadImageEntity, UploadImageProfileUsecase } from '@app/auth/register/domain';

@Injectable({ providedIn: 'root' })
export class UploadImageManagmenteService {

  private readonly uploadImageUsecase = inject(UploadImageProfileUsecase);

  imagePreview = signal<string>('');
  selectedFile = signal<File | null>(null);
  avatarUrlImageProfile = signal<string>('');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      this.selectedFile.set(null);
      return;
    }

    const file = input.files[0];
    if (!file.type.startsWith('image/')) return;

    this.selectedFile.set(file);
    this.imagePreview.set(URL.createObjectURL(file));
  }

  async uploadImage(username: string): Promise<void> {
    if (!this.selectedFile()) return;

    const normalizedUsername = username.replaceAll(' ', '-');

    const data: UploadImageEntity = {
      uploadPreset: 'ml_default',
      publicId: normalizedUsername,
      apiKey: environment.api_key_image_storage,
      file: this.selectedFile()!,
      folder: `${normalizedUsername}-Image-Profile`,
    };

    await this.uploadImageProfileMutation.mutateAsync(data);
  }

  removeImage(fileInput?: HTMLInputElement) {
    this.selectedFile.set(null);

    if (this.imagePreview()) {
      URL.revokeObjectURL(this.imagePreview());
      this.imagePreview.set('');
    }

    if (fileInput) {
      fileInput.value = '';
    }
  }

  uploadImageProfileMutation = injectMutation(() => ({
    mutationFn: async (data: UploadImageEntity) =>
      await this.uploadImageUsecase.execute(data),
    onSuccess: (response) => {
      const shortUrl = response.secure_url.split('upload')[1];
      this.avatarUrlImageProfile.set(shortUrl);
    },
  }));

  reset() {
    if (this.imagePreview()) {
      URL.revokeObjectURL(this.imagePreview());
    }

    this.selectedFile.set(null);
    this.imagePreview.set('');
    this.avatarUrlImageProfile.set('');
  }

}