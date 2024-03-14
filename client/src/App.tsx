import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Wall from './Components/Wall/Wall';
import Login from './Components/Login-Register/Login';
import Account from './Components/Account/Account';
import BrowseRecipes from './Components/BrowseRecipes/BrowseRecipes';
import Recipe from './Components/Recipe/Recipe';
import Review from './Components/Review/Review';

function App() {
  return (
    <div className="App" id='background-img' style={{height: '100vh', overflowY: 'auto'}}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Wall />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route path='/browse' element={<BrowseRecipes />}></Route>
        <Route path='/recipe' element={<Recipe />}></Route>
        <Route path='/review' element={<Review />}></Route>
      </Routes>
    </div>
  );
}

export default App;
