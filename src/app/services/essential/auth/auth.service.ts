import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, tap, catchError, throwError, BehaviorSubject, of, shareReplay, finalize, switchMap, filter, map } from 'rxjs';
import { AdaptflowService } from '../../rest/adaptflow.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetails } from '../../../interface/user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserDetails$: BehaviorSubject<UserDetails | null> = new BehaviorSubject<UserDetails | null>(null);
  private userDetailsLoaded = false;
  private loadingUserDetails = false; //flag to check user details loading in process
  private isLoginPage: boolean = false;

  public currentUserDetailsObservable$ = this.currentUserDetails$.asObservable();

  constructor(
    private router: Router,
    private adaptflowService: AdaptflowService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.url === '/login';
      this.loadUserDetailsOnAppStart();
    });
  }

  private loadUserDetailsOnAppStart(): Observable<any> {
    // Check if we're on the login page or if we've already loaded/loading user details.
    if (this.isLoginPage || this.userDetailsLoaded || this.loadingUserDetails) {
      return of('');
    }
    this.loadingUserDetails = true;
    return this.getUserDetails().pipe(
      finalize(() => {
        this.loadingUserDetails = false;
      })
    );
  }

  login(username: string, password: string): Observable<String> {
    return this.adaptflowService.login(username, password).pipe(
      tap((response) => {
        // After successful login, fetch user details
        this.getUserDetails().subscribe(userDetails => {
          this.currentUserDetails$.next(userDetails);
          this.userDetailsLoaded = true;
        });
      }),
      catchError((error) => {
        console.error('Login error:', error.error);
        return throwError(() => error.error);
      })
    );
  }

  private getUserDetails(): Observable<UserDetails> {
    if (this.currentUserDetails$.value != null) {
      return of(this.currentUserDetails$.value);
    }
    return this.adaptflowService.getUserDetails().pipe(
      tap((userDetails: UserDetails) => {
        console.log("Got user details", userDetails)

      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user details:', error);
        this.router.navigate(['/login']);
        return throwError(() => error);
      }),
      shareReplay(1) // Make sure the API call is only executed once.
    );
  }

  logout(): void {
    this.adaptflowService.logout().subscribe(() => {
      this.clearUserDetails();
      this.router.navigate(['/login']);
    },
      error => {
        console.log('Logout error:', error);
        this.clearUserDetails();
        this.router.navigate(['/login']);
      });
  }

  private clearUserDetails(): void {
    this.currentUserDetails$.next(null);
    this.userDetailsLoaded = false;
  }

  public isUserDetailsLoaded(): Observable<boolean> {
    if(this.currentUserDetails$.getValue()) {
      return of(true);
    }
    return this.loadUserDetailsOnAppStart().pipe(
      map(userDetails => {
        this.currentUserDetails$.next(userDetails);
        this.userDetailsLoaded = true;
        return true;
      }),
      catchError(error => {
        console.error("Unable to load user details at start", error);
        this.userDetailsLoaded = false;
        this.logout();
        return of(false);
      })
    );
  }
}
