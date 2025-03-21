import { Component } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

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
constructor(private router: Router) {}
  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: this.email,
        password: this.password
      });

      localStorage.setItem('access_token', response.data.token);
      console.log('Đăng nhập thành công:', response.data);
      alert('Đăng nhập thành công!');
       this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Đăng nhập thất bại! Vui lòng thử lại.';
      console.error('Lỗi đăng nhập:', error);
    }
  }
}
