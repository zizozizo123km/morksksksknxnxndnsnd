import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy loading for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const WatchPage = lazy(() => import('./pages/WatchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Layouts and Wrappers
import AuthGuard from './components/auth/AuthGuard'; // Protects logged-in routes
import LoadingSpinner from './components/ui/LoadingSpinner'; // Simple loading fallback

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><LoadingSpinner /></div>}>
        <Routes>
          {/* Authentication Routes (Public) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes (Requires Authentication) */}
          <Route element={<AuthGuard />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<HomePage />} />
            <Route path="/watch/:mediaId" element={<WatchPage />} />
            {/* Future routes: /series, /movies, /latest, /mylist */}
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
// Note: AuthGuard, LoadingSpinner, and the page components need to be implemented separately.