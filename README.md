# Angular Quiz — User Directory

This project implements all tasks from the Angular Quiz brief with styling, animations, and caching using Angular Material.

## Task mapping (requirements → implementation)

1) Create Angular 7+ project using CLI
- Implemented with Angular 20 CLI, standalone components, SSR-ready. See `angular.json`, `src/main.ts`.

2) Page with header and paginated users list (horizontally centered)
- Header: `src/app/components/header/*`
- Users list: `src/app/components/user-list/*` uses Material cards + `MatPaginator`, centered grid via `.users-grid` CSS.

3) Use HTTP endpoints https://reqres.in/api/users?page={page} and https://reqres.in/api/users/{id}
- Service: `src/app/services/user.ts` calls both endpoints, types in `interfaces/user.interface.ts`.

4) Click card → navigate to detail page
- In `UserList.onUserClick()` router navigates to `/user/:id`. Route defined in `app.routes.ts`.

5) Instant search (no button) in header by Id with navigation to details
- Debounced search implemented in `Header` with `(ngModelChange)` + RxJS; when user exists it navigates to `/user/:id`. If not found, a snackbar shows feedback.

6) Back button on each individual card page
- `UserDetail` has Back and Home buttons using `Location.back()` and router navigation.

7) Caching to avoid additional requests
- In-memory Map cache in `UserService` for lists and single users. Subsequent calls return cached observables.

8) Loading bar for pending network requests
- `LoadingService` + `loadingInterceptor` show a global `MatProgressBar` in the header while HTTP is in-flight.

Styling/Animations
- Angular Material theming and components, hover transitions, smooth route fade-in, responsive SCSS across components, centered layouts.

## How each part works

- Routing: `app.routes.ts` maps '' → `UserList`, 'user/:id' → `UserDetail`.
- User list: `UserService.getUsers(page)` fetches data; paginator emits `PageEvent` to request new page.
- User detail: `UserService.getUserById(id)` loads user; errors handled with snackbar and redirect.
- Search: `Header` debounces numeric input, checks existence via service, navigates on success.
- Caching: `Map<string, any>`; keys like `users-page-1`, `user-2` to store responses/users and return with `of(...)`.
- Loading: HTTP interceptor tracks total requests and toggles `LoadingService.loading$`; header subscribes to show the bar.

## Run, build, test (Windows PowerShell)

```powershell
# Install dependencies
npm install

# Start dev server (http://localhost:4200)
npm start

# Run unit tests in watch mode
npm test

# Production build
npm run build
```

If you run into Windows EPERM during install (locked esbuild.exe), close apps using the repo and run:

```powershell
# Optional: kill esbuild to unlock node_modules
Taskkill /IM esbuild.exe /F
npm install
```

## Folder guide

- `src/app/components/header` — toolbar, instant search, global progress bar
- `src/app/components/user-list` — centered grid of Material cards + paginator
- `src/app/components/user-detail` — details page with back/home
- `src/app/services/user.ts` — API + caching, error handling
- `src/app/services/loading.ts` — global loading state
- `src/app/interceptors/loading-interceptor.ts` — toggles loading on HTTP
- `src/app/interfaces/user.interface.ts` — types for API results
- `src/app/app.config.ts` — providers: router, http client with interceptor, animations

## Notes

- Uses Angular Material with a custom theme in `src/styles.scss` and component styles for a polished look.
- SSR config exists; dev server uses client rendering by default.

## Deliverable

- This repository is ready to zip or share as a GitHub link as required by the task.
