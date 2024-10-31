import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarMenuComponent } from "../../components/configurations/sidebar-menu/sidebar-menu.component";
import { CredentialsComponent } from "../../components/configurations/credentials/credentials.component";

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [NavbarComponent, SidebarMenuComponent, CredentialsComponent],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent {

}
