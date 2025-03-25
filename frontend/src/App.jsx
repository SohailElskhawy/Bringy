import './App.css'
import { AdminLogin, AdminOrders, Basket,
    Checkout, CustomerLogin, CustomerOrders, 
    CustomerRegister, Home, Products } from './pages'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/admin/login' element={<AdminLogin />} />
                <Route path='/admin/orders' element={<AdminOrders />} />
                <Route path='/basket' element={<Basket />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/customer/login' element={<CustomerLogin />} />
                <Route path='/customer/orders' element={<CustomerOrders />} />
                <Route path='/customer/register' element={<CustomerRegister />} />
                <Route path='/products' element={<Products />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App
