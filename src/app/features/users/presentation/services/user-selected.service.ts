import { computed, Injectable, signal } from '@angular/core';

import { UsersEntity } from '@app/tasks/domain';

@Injectable({ providedIn: 'root' })
export class UserSelectedService {

  private readonly _selectedUser = signal<UsersEntity | null>(null);

  readonly selectedUser = computed(() => this._selectedUser());

  setSelectedUser(role: UsersEntity) {
    this._selectedUser.set(role);
  }

  clearSelectedRole() { this._selectedUser.set(null); }

  updateSelectedUser(partial: Partial<UsersEntity>) {
    const current = this._selectedUser();
    if (!current) return;

    // this._selectedUser.set({ ...partial });
  }
}