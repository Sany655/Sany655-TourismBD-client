import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import init from './Firebase/firebase.init';
import AuthProvider from './context/AuthProvider';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import BookTour from './components/BooksTour/BookTour';
import AddTour from './components/AddTour/AddTour';
import axios from 'axios';
import MyBooking from './components/MyBooking/MyBooking';
import Notfound from './components/Notfound/Notfound';
import ManageBooking from './components/ManageBooking/ManageBooking';
init()
function App() {

  // axios.defaults.baseURL = 'https://tourismbd.onrender.com/'
  axios.defaults.baseURL = 'http://localhost:5000';

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <PrivateRoute path='/add-tour'>
              <AddTour />
            </PrivateRoute>
            <PrivateRoute path='/manage-bookings'>
              <ManageBooking />
            </PrivateRoute>
            <PrivateRoute path='/my-bookings'>
              <MyBooking />
            </PrivateRoute>
            <PrivateRoute path='/book-tour/:id'>
              <BookTour />
            </PrivateRoute>
            <Route path='*'>
              <Notfound />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
