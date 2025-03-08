import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { AdaptflowService } from '../../rest/adaptflow.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private adaptflowService: AdaptflowService
  ) { }

  login(username: string, password: string): Observable<String> {
    return this.adaptflowService.login(username, password).pipe(
      tap((response) => { }),
      catchError((error) => {
        console.error('Login error:', error.error);
        return throwError(() => error.error);
      })
    );
  }

  logout(): void {
    this.adaptflowService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    },
    error => {
      console.log('Logout error:',error);
      this.router.navigate(['/login']);
    });

  }
}
