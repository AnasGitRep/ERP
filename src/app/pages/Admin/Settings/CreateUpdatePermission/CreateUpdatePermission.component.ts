import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/Models/Base/UserDto';
import { AuthServicesService } from 'src/app/services/AuthServices.service';
import { NotificationServiceService } from 'src/app/services/NotificationService.service';

@Component({
  selector: 'app-CreateUpdatePermission',
  templateUrl: './CreateUpdatePermission.component.html',
  styleUrls: ['./CreateUpdatePermission.component.css'],
})
export class CreateUpdatePermissionComponent implements OnInit {
  userId: number;
  permissions: any[] = [];
  users: UserDto[] = [];
  availablePermissions: any[] = [];
  selectedCity: UserDto; // Initialize selectedCity properly

  countries: any[] | undefined;

  selectedCountry: string | undefined;

  constructor(
    private permissionService: AuthServicesService,
    private notificationService: NotificationServiceService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchPermissions();


    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];
  }

  fetchUsers(): void {
    this.permissionService.getUsers().subscribe(
      (users) => {
        this.users = users.items;
      },
      (error) => {
        console.error('Failed to fetch users:', error);
      }
    );
  }

  fetchPermissions(): void {
    this.permissionService.getPermissions().subscribe(
      (permissions) => {
        this.availablePermissions = permissions.items;
        console.log(permissions);
      },
      (error) => {
        console.error('Failed to fetch permissions:', error);
      }
    );
  }

  togglePermission(permission: string): void {
    if (this.permissions.includes(permission)) {
      this.permissions = this.permissions.filter((p) => p !== permission);
    } else {
      this.permissions.push(permission);
    }
  }

  addPermissions() {
    this.permissionService.addPermissions(this.userId, this.permissions).subscribe((x) => {
      console.log(x);
      if (x.message != null) {
        if (x.isOk == true) {
          this.notificationService.showSuccess(x.message);
        } else {
          this.notificationService.showError(x.message);
        }
      }
    });
  }
}
