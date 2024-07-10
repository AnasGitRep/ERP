import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  navItemss: NavItem[] = navItems;
  dropdownStates: { [key: string]: boolean } = {};

  constructor(public navService: NavService) {}

  ngOnInit(): void {}

  toggleDropdown(item: NavItem): void {
    if (item.displayName) {
      this.dropdownStates[item.displayName] = !this.dropdownStates[item.displayName];
    }
  }

  isDropdownOpen(item: NavItem): boolean {
    return !!item.displayName && this.dropdownStates[item.displayName];
  }
}
