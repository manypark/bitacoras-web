import { inject, Injectable } from '@angular/core';
import { CreateUpdateUserFormService } from '@app/users/presentation/services/create-update-user-form.service';
import { UploadImageManagmenteService } from '@app/users/presentation/services/uploadImageManagmente.service';

@Injectable({ providedIn: 'root' })
export class CreateOrUpdateUserFacade {

  private readonly formService = inject(CreateUpdateUserFormService);
  private readonly imageService = inject(UploadImageManagmenteService);

  async submit(): Promise<void> {

    if (!this.formService.createOrUpdateUserForm.valid) return;

    const { firstName, lastName } = this.formService.createOrUpdateUserForm.value;
    const username = `${firstName}-${lastName}`;

    if (this.imageService.selectedFile()) {
      await this.imageService.uploadImage(username);
    }

    const formData = this.formService.buildUserEntity(
      this.imageService.avatarUrlImageProfile(),
      this.imageService.imagePreview()
    );

    if (this.formService.idUserParam() !== 0) {
      this.formService.update(formData);
    } else {
      this.formService.create(formData);
    }
  }

  async loadUser(id: number) {
    const response = await this.formService.getUserInfo.mutateAsync(id);

    const { data } = response;

    this.formService.hydrateForm(data);

    this.imageService.imagePreview.set(data.avatarUrl ?? '');
  }

  resetStateForCreate() {
    this.formService.resetForm();
    this.imageService.reset();
  }
}