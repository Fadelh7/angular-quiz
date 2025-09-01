# Angular Quiz — User Directory

This project implements all tasks from the Angular Quiz brief with styling, animations, and caching using Angular Material.

## 🚀 Quick Start (Development)

```bash
# Clone the repository
git clone https://github.com/Fadelh7/angular-quiz.git
cd angular-quiz

# Install dependencies
npm install

# Start development server
npm start

# Open browser and navigate to http://localhost:4200
```

The application will automatically reload when you make changes to the source files.

## ✅ Quiz Requirements Compliance

### **Requirement 1: Angular 7+ Project using CLI**
- ✅ **Implemented with Angular 20.2.x** (far exceeds Angular 7+ requirement)
- ✅ Created using Angular CLI with modern standalone components
- ✅ SSR-ready configuration included
- 📁 See: `angular.json`, `package.json`, `src/main.ts`

### **Requirement 2: Header + Paginated Users List (Horizontally Centered)**
- ✅ **Header component** with navigation and search functionality
- ✅ **Paginated user grid** using Angular Material `MatPaginator`
- ✅ **Horizontally centered layout** with responsive CSS Grid
- 📁 Header: `src/app/components/header/*`
- 📁 User List: `src/app/components/user-list/*`

### **Requirement 3: HTTP Endpoints Usage**
- ✅ **List endpoint**: `https://reqres.in/api/users?page={page}`
- ✅ **Single user endpoint**: `https://reqres.in/api/users/{id}`
- ✅ **TypeScript interfaces** for API responses
- 📁 Service: `src/app/services/user.ts`
- 📁 Types: `src/app/interfaces/user.interface.ts`

### **Requirement 4: Card Click → Detail Page Navigation**
- ✅ **Click handler** in `UserList.onUserClick()`
- ✅ **Router navigation** to `/user/:id`
- ✅ **Route configuration** in `app.routes.ts`
- 📁 Navigation: `src/app/app.routes.ts`

### **Requirement 5: Instant Search (No Button) by ID**
- ✅ **Debounced search** in header (400ms delay)
- ✅ **RxJS operators** for search optimization
- ✅ **Auto-navigation** to user details when found
- ✅ **User feedback** via Material Snackbar when not found
- 📁 Implementation: `src/app/components/header/header.ts`

### **Requirement 6: Back Button on Individual Pages**
- ✅ **Back button** using `Location.back()`
- ✅ **Home button** for navigation to main list
- ✅ **Material Design** button styling
- 📁 Implementation: `src/app/components/user-detail/*`

### **Requirement 7: Caching for Performance**
- ✅ **In-memory caching** using Map data structure
- ✅ **User list caching** by page number
- ✅ **Individual user caching** by ID
- ✅ **Observable return** for cached data with `of()`
- 📁 Implementation: `src/app/services/user.ts`

### **Requirement 8: Loading Bar for Network Requests**
- ✅ **HTTP Interceptor** for request tracking
- ✅ **Global loading service** with reactive state
- ✅ **Material Progress Bar** in header
- ✅ **Automatic show/hide** during HTTP operations
- 📁 Loading Service: `src/app/services/loading.ts`
- 📁 Interceptor: `src/app/interceptors/loading-interceptor.ts`

## 🎨 Additional Features (Beyond Requirements)

- **Angular Material UI** - Modern, accessible components
- **Enhanced Search** - Search state management service
- **Responsive Design** - Mobile-friendly layouts
- **Smooth Animations** - Page transitions and hover effects
- **Error Handling** - User-friendly error messages
- **TypeScript Strict Mode** - Enhanced type safety
- **SCSS Styling** - Modern CSS with variables and mixins

## 🛠 Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4200)
npm start

# Run unit tests in watch mode
npm test

# Run tests once
npm run test -- --watch=false

# Production build
npm run build

# Build and watch for changes
npm run watch

# Serve SSR build (after building)
npm run serve:ssr:user-directory
```

## 🐛 Troubleshooting

### Windows EPERM Error
If you encounter EPERM errors during `npm install` (locked esbuild.exe):

```bash
# Close any apps using the repository, then:
Taskkill /IM esbuild.exe /F
npm install
```

### Port Already in Use
If port 4200 is occupied:

```bash
# Start on different port
ng serve --port 4201
```

## 📁 Project Structure

```
src/app/
├── components/
│   ├── header/          # Navigation toolbar with instant search
│   ├── user-list/       # Paginated user grid with Material cards
│   └── user-detail/     # Individual user profile pages
├── services/
│   ├── user.ts          # API service with caching
│   ├── loading.ts       # Global loading state management
│   └── search.ts        # Search state coordination
├── interceptors/
│   └── loading-interceptor.ts  # HTTP request tracking
├── interfaces/
│   └── user.interface.ts       # TypeScript type definitions
├── app.config.ts        # Application providers and configuration
└── app.routes.ts        # Route definitions
```

## 🧪 Testing

The project includes comprehensive unit tests for all components and services:

- **Components**: Header, UserList, UserDetail
- **Services**: UserService, LoadingService, SearchService  
- **Interceptors**: LoadingInterceptor
- **Coverage**: Jasmine + Karma test runner

## 🚀 Production Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Deploy the contents to your web server
```

## 📋 Requirements Met

✅ **Angular 7+**: Using Angular 20.2.x  
✅ **Angular CLI**: Project created and configured with CLI  
✅ **Material UI**: Angular Material components and theming  
✅ **Proper Styling**: SCSS with responsive design and animations  
✅ **Caching**: In-memory service-level caching  
✅ **TypeScript**: Strict mode with comprehensive typing  
✅ **Testing**: Unit tests for all major components  
✅ **Performance**: Optimized builds and lazy loading ready  

## 📝 Deliverable

This repository serves as the complete deliverable for the Angular Quiz task:
- ✅ GitHub repository: https://github.com/Fadelh7/angular-quiz
- ✅ All requirements implemented and exceeded
- ✅ Modern Angular best practices
- ✅ Production-ready configuration
