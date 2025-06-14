import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public user: User = null;
  paths = [
    {
      route: '/dashboard/profile',
      class: 'fas fa-user',
      label: 'Profile',
      role: 'Admin',
    },
    {
      route: '/dashboard/orders',
      class: 'fas fa-truck-moving',
      label: 'Orders',
      role: 'Admin',
    },
    {
      route: '/dashboard/products',
      class: 'fas fa-boxes',
      label: 'Products',
      role: 'Admin',
    },
    {
      route: '/dashboard/notifications',
      class: 'fas fa-boxes',
      label: 'Notifications',
      role: 'Admin',
    },
    {
      route: '/dashboard/circulars',
      class: 'fas fa-boxes',
      label: 'Circulars',
      role: 'Admin',
    },
    {
      route: '/dashboard/market',
      class: 'fas fa-people-carry',
      label: 'Markets',
      role: 'Admin',
    },
    {
      route: '/dashboard/routes',
      class: 'fas fa-truck-moving',
      label: 'Routes',
      role: 'Admin',
    },
    {
      route: '/dashboard/user-routes',
      class: 'fas fa-users',
      label: 'User Routes',
      role: 'Admin',
    },
    {
      route: '/dashboard/users',
      class: 'fas fa-users',
      label: 'Manage Users',
      role: 'Admin',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.fetchFromSessionStorage() !== null)
      this.user = this.authService.fetchFromSessionStorage();
    else this.router.navigateByUrl('/login');
    if (this.user != null && this.user.role === 'User')
      this.paths = this.paths.filter((path) => path.role === this.user.role);
  }

  signOut() {
    this.authService.logout();
  }
}
