import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email: this.email,
        password: this.password
      });

      console.log('Đăng nhập thành công:', response.data);
      alert('Đăng nhập thành công!');
    } catch (error) {
      this.errorMessage = 'Đăng nhập thất bại! Vui lòng thử lại.';
      console.error('Lỗi đăng nhập:', error);
    }
  }
}
