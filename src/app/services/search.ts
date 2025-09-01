import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchModeSubject = new BehaviorSubject<{ isSearchMode: boolean; userId?: number }>({
    isSearchMode: false
  });
  
  public searchMode$ = this.searchModeSubject.asObservable();

  setSearchMode(userId: number): void {
    this.searchModeSubject.next({ isSearchMode: true, userId });
  }

  clearSearchMode(): void {
    this.searchModeSubject.next({ isSearchMode: false });
  }
}