
import './App.css';
import Header from './component/Header';
import { Route, Routes } from "react-router-dom"
import Homepage from './routes/Homepage';
import Addproduct from './routes/Addproduct';
import Allproduct from './routes/Allproduct';
import EditProduct from './routes/EditProduct';
import  { Toaster } from 'react-hot-toast';

function App() {
  
  return (
    <>
    
  <Toaster/>
    <Header/>
  
  <div>
  <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/addproduct" element={<Addproduct />} />
      <Route path="/allproduct" element={<Allproduct />} />
      <Route path="/:id" element={<EditProduct />} />
    </Routes>
  </div>
  </>
  );
}

export default App;
