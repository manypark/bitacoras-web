import { inject, Injectable } from "@angular/core";
import { catchError, firstValueFrom, throwError } from "rxjs";

import { ApiResponse } from "@utils/api_response";
import { HttpClientService } from "../../../../../core/services";
import { RegisterCompleteEntity, RegisterDatasource, RegisterEntity, RegisterResponseEntity, UploadImageEntity, UploadImageResponseEntity } from "@app/auth/register/domain";

@Injectable({ providedIn: 'root' })
export class RegisterDatasourceImpl implements RegisterDatasource {
    
    private httpClient = inject(HttpClientService);

    async register( { email, firstName, lastName, password }:RegisterEntity ): Promise<ApiResponse<RegisterResponseEntity>> {
        return await firstValueFrom( this.httpClient.post<ApiResponse<RegisterResponseEntity>>('/auth/singUp', {
                firstName   : firstName.getValue(),
                lastName    : lastName.getValue(),
                email       : email.getValue(), 
                password    : password.getValue(),
            }).pipe( catchError(error =>  throwError( () => new Error(error.error.message) ) ), )
        );
    }

    async registerComplete( { email, firstName, idRoles, lastName, password, imageUrl }: RegisterCompleteEntity): Promise<ApiResponse<RegisterResponseEntity>> {
        return await firstValueFrom( this.httpClient.post<ApiResponse<RegisterResponseEntity>>('/auth/singUpComplete', {
                firstName   : firstName.getValue(),
                lastName    : lastName.getValue(),
                email       : email.getValue(), 
                password    : password.getValue(),
                idRoles,
                avatarUrl   : imageUrl
            }).pipe( catchError(error =>  throwError( () => new Error(error.error.message) ) ), )
        );
    }

    async uploadImageProfile(data: UploadImageEntity): Promise<UploadImageResponseEntity> {
        const formData = new FormData();

        formData.append('upload_preset', data.uploadPreset);
        formData.append('public_id', data.publicId);
        formData.append('api_key', data.apiKey);
        formData.append('folder', data.folder);
        formData.append('file', data.file);

        return await firstValueFrom( this.httpClient.uploadIamge<UploadImageResponseEntity>('', formData).pipe(
                catchError(error =>  throwError( () => new Error(error.error) ) ), 
            )
        );
    }
}