import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user';
import { SearchService } from '../../services/search';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnDestroy {
  searchId: string = '';
  private searchInput$ = new Subject<string>();
  private sub: Subscription;

  constructor(
    private router: Router,
    public loadingService: LoadingService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private searchService: SearchService
  ) {
    // Debounced instant search by ID (no button required)
    this.sub = this.searchInput$
      .pipe(
        debounceTime(400),
        map((val) => String(val ?? '').trim()),
        distinctUntilChanged(),
        switchMap((val) => {
          // If empty, clear search mode
          if (!val) {
            this.searchService.clearSearchMode();
            return of(null);
          }
          
          const id = parseInt(val, 10);
          if (isNaN(id) || id <= 0) {
            return of(null);
          }
          
          return this.userService.getUserById(id).pipe(
            // If API says 404, show feedback and stay
            catchError((err) => {
              this.snackBar.open(err.message || 'User not found', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });
              return of(null);
            }),
            map((user) => (user ? id : null))
          );
        })
      )
      .subscribe((id) => {
        if (id) {
          this.searchService.setSearchMode(id);
        }
      });
  }

  onSearchUser(): void {
    const userId = parseInt(String(this.searchId ?? '').trim());
    if (userId && userId > 0) {
      // Check if user exists first
      this.userService.getUserById(userId).pipe(
        catchError((err) => {
          this.snackBar.open(err.message || 'User not found', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          return of(null);
        })
      ).subscribe((user) => {
        if (user) {
          this.searchService.setSearchMode(userId);
          this.searchId = '';
        }
      });
    }
  }

  onSearchChange(value: string): void {
    this.searchInput$.next(value);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearchUser();
    }
  }

  clearSearch(): void {
    this.searchId = '';
    this.searchService.clearSearchMode();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}