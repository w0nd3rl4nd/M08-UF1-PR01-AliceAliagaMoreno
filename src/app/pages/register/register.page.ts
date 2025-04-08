import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/players']);
    } catch (error) {
      console.error('Registration error: ', error);
    }
  }

}
