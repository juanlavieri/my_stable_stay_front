import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const StableDetails = lazy(() => import('./pages/StableDetails'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
// ... other lazy imports

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stable/:id" element={<StableDetails />} />
          <Route path="/user/profile" element={<UserProfile />} />
          // ... other routes
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;