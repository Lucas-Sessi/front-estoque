import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
  ) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  login(data: any): void {
    if (data.access_token) {
      sessionStorage.setItem('token', data.access_token);

      this.router.navigate(['/home']);
      
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false); 
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
