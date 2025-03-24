import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../services/essential/auth/auth.service';


@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MenuModule, ButtonModule, RippleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            }
          }
        ]
      }
    ];
  }

  logout() {
    this.authService.logout();
  }
}
