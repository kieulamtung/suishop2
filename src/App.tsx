import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import StorePage from './pages/StorePage'
import ProductPage from './pages/ProductPage'
import SellerDashboard from './pages/SellerDashboard'
import MyVouchers from './pages/MyVouchers'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="store/:storeId" element={<StorePage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="seller" element={<SellerDashboard />} />
        <Route path="vouchers" element={<MyVouchers />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
