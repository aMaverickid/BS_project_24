// src/routes.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Forget from './pages/forget.js';
// import Menupage from './pages/menu.js';
import Searchpage from './pages/search.js';
import MenuPage from './pages/menu.js';
// import Detail from './pages/detail.js';
// import MyDiscount from './pages/mydiscount.js';

// demo for react-router v6
// import { Routes, Route } from "react-router";

// function Wizard() {
//   return (
//     <div>
//       <h1>Some Wizard with Steps</h1>
//       <Routes>
//         <Route index element={<StepOne />} />
//         <Route path="step-2" element={<StepTwo />} />
//         <Route path="step-3" element={<StepThree />}>
//       </Routes>
//     </div>
//   );
// }
const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<Forget />} />
          
          <Route path="/search" element={<Searchpage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/mydiscount" element={<MyDiscount />} /> */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  };

export default AppRoutes;