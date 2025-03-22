import { Component, Injector } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],

})
  
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userName: any;

  constructor(private authService: AuthService, private router: Router) { }
loginWithGoogle() {
  this.authService.login('google');
}
  async login(type: 'backend' | 'google', event : Event) {
  
  event.preventDefault();
    try {
      const user = await this.authService.login(type, this.email, this.password);

      this.userName = this.authService.getCurrentUser()?.userName || 'Người dùng';

      Swal.fire({ position: 'top-end', icon: 'success', title: 'Đăng nhập thành công!', showConfirmButton: false, timer: 1500 });
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Đăng nhập thất bại! Vui lòng thử lại.';
    }  
  }
}
