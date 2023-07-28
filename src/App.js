import './App.css';
import Registration from './components/Registration';
import Admin from './components/Admin';
import { Routes,Route } from 'react-router-dom';
import Login from './components/Login';
// import Login from './components/Loginogin';

function App() {
  return (
    <>
   <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </>
  );
}

export default App;
