import { injectMutation } from '@tanstack/angular-query-experimental';
import { ElementRef, inject, Injectable, signal, ViewChild } from '@angular/core';

import { environment } from '@environment/environment';
import { CreateUpdateUserFormService } from '@app/users/presentation/services';
import { UploadImageEntity, UploadImageProfileUsecase } from '@app/auth/register/domain';

@Injectable({ providedIn: 'root' })
export class UploadImageManagmenteService {
  // #=============== dependencias ===============#
  private readonly uploadImageUsecase = inject(UploadImageProfileUsecase);
  private readonly createUpdateUserFormServices = inject(CreateUpdateUserFormService);
  
  // #=============== variables ===============#
  imagePreview = signal<string>('');
  selectedFile = signal<File | null>(null);
  avatarUrlImageProfile = signal<string>('');
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // #=============== variables ===============#
  onFileSelected( event:Event ) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile.set(null);
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) return;

    this.selectedFile.set(file);

    this.imagePreview.set( URL.createObjectURL(file) );
  }

  uploadImage() {
    const username = `${this.createUpdateUserFormServices.getFirstName}-${this.createUpdateUserFormServices.getLastName}`.replaceAll(' ', '-');
    
    const data:UploadImageEntity = {
      uploadPreset: 'ml_default',
      publicId    : username ?? 'image-default',
      apiKey      : environment.api_key_image_storage,
      file        : this.selectedFile()!,
      folder      : `${username ?? 'image-default'}-Image-Profile`,
    };

    return this.uploadImageProfileMutation.mutateAsync( data );
  }

  removeImage() {
    this.selectedFile.set(null);

    if (this.imagePreview) {
      URL.revokeObjectURL( this.imagePreview() );
      this.imagePreview.set('');
      this.fileInput.nativeElement.value = '';
    }
  }

  uploadImageProfileMutation = injectMutation( () => ({
    mutationFn  : async ( data:UploadImageEntity ) => await this.uploadImageUsecase.execute(data),
    onSuccess   : ( dataResponse ) => {
      const shortUrlImageProfile = dataResponse.secure_url.split('upload')[1];
      this.avatarUrlImageProfile.set(shortUrlImageProfile);
    },
  }));
}