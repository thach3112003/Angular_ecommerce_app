import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
   imports: [ 
    CommonModule,
    FormsModule,
    
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserMenuOpen = false;
  isSearchOpen = false;
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userName = this.authService.getCurrentUser()?.displayName || 'Người dùng';
  }

  handleUserClick() {
    if (localStorage.getItem('access_token')) {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    } else {
      this.router.navigate(['/login']);
    }
  }

  handleCartClick() {
    if (!localStorage.getItem('access_token')) {
      Swal.fire({ icon: 'error', title: 'Please login!', timer: 2500 });
      this.router.navigate(['/login']);
    }
  }

  handleLogOut() {
    this.authService.logout();
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  searchQuery = '';
  search() {
    console.log('Tìm kiếm:', this.searchQuery);
  }
}
