import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user';
import { SearchService } from '../../services/search';
import { User, UserResponse } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {
  users: User[] = [];
  currentPage = 1;
  totalUsers = 0;
  usersPerPage = 6;
  totalPages = 0;
  isSearchMode = false;
  searchedUser: User | null = null;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
    
    // Listen for search mode changes
    this.searchService.searchMode$.subscribe(searchState => {
      this.isSearchMode = searchState.isSearchMode;
      
      if (searchState.isSearchMode && searchState.userId) {
        // Load the specific user
        this.userService.getUserById(searchState.userId).subscribe({
          next: (user: User) => {
            this.searchedUser = user;
            this.users = [user]; // Show only the searched user
          },
          error: (error) => {
            this.snackBar.open('Failed to load user: ' + error.message, 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        });
      } else {
        // Back to normal mode - reload the current page
        this.searchedUser = null;
        this.loadUsers(this.currentPage);
      }
    });
  }

  loadUsers(page: number): void {
    this.userService.getUsers(page).subscribe({
      next: (response: UserResponse) => {
        this.users = response.data;
        this.totalUsers = response.total;
        this.usersPerPage = response.per_page;
        this.totalPages = response.total_pages;
        this.currentPage = response.page;
      },
      error: (error) => {
        this.snackBar.open('Failed to load users: ' + error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.loadUsers(event.pageIndex + 1);
  }

  onUserClick(user: User): void {
    this.router.navigate(['/user', user.id]);
  }

  clearSearch(): void {
    this.searchService.clearSearchMode();
  }
}
