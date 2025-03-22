import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import axios from 'axios';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;

  constructor(private auth: Auth, private router: Router) {}  

  async login(type:'backend'| 'google', email?: string, password?: string) {
      try {
          if (type === 'google') {
              const provider = new GoogleAuthProvider();
              const result = await signInWithPopup(this.auth, provider);
              this.user = result.user;
              localStorage.setItem('user', JSON.stringify(this.user));
              console.log('Đăng nhập thành công:', this.user);
              this.router.navigate(['/home']);
          } else {
              if (!email || !password) throw new Error('Thiếu thông tin đăng nhập');
              
                const response = await axios.post('https://reqres.in/api/login', { email, password });

                localStorage.setItem('access_token', response.data.token);

              this.user = response.data.user;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successful!',
                    showConfirmButton: false,
                    timer: 1500
      });
       this.router.navigate(['/']);
          }
           console.log(`Người dùng đăng nhập từ ${type}:`, this.user);
      return this.user;
      }
      catch(error) {
           console.error(`Lỗi đăng nhập ${type}:`, error);
      throw error;
      }
      
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    signOut(this.auth);
    this.user = null;
      console.log('Đã đăng xuất');
      
    }
    
    getCurrentUser() {
    return this.user || JSON.parse(localStorage.getItem('user') || 'null');
  }
}
