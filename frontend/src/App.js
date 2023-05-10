import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import ForgetPassword from './pages/auth/ForgetPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Contact from './pages/Contact/Contact';
import Courses from './pages/Courses/Courses';
import Home from './pages/Home/Home';
import Footer from './pages/layout/Footer/Footer';
import Header from './pages/layout/Header/Header';
import Request from './pages/Request/Request';
import Subscribe from './pages/Payments/Subscribe';
import NotFound from './pages/layout/Not Found/NotFound';
import PaymentSuccess from './pages/Payments/PaymentSuccess';
import PaymentFail from './pages/Payments/PaymentFail';
import CoursePage from './pages/CoursePage/CoursePage';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/Profile/ChangePassword';
import UpdateProfile from './pages/Profile/UpdateProfile';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import CreateCourse from './pages/Admin/CreateCourse/CreateCourse';
import AdminCourses from './pages/Admin/AdminCourses/AdminCourses';
import Users from './pages/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/Actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './pages/layout/Loader/Loader';

const App = () => {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BrowserRouter>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/course/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CoursePage user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect={'/profile'}
                  >
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect={'/profile'}
                  >
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/changepassword"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/updateprofile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgetpassword"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect={'/profile'}
                  >
                    <ForgetPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resetpassword/:token"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect={'/profile'}
                  >
                    <ResetPassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/request" element={<Request />} />
              <Route
                path="/subscribe"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Subscribe user={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/paymentfail" element={<PaymentFail />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/createcourse"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <AdminCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>

          <Footer />
          <Toaster />
        </>
      )}
    </div>
  );
};

export default App;
