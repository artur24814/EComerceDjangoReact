import './App.css';
import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { ShoppingCartProvider } from "./context/ShoppingCartCtx"
import Home  from './pages/Home'
import Store from './pages/Store';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Completion from './pages/Competion';
import ShippingInfo from './pages/ShippingInfo';
import Navbar from './components/Navbar';

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/shipping" element={<ShippingInfo />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
