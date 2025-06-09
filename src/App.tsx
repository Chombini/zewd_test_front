import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CustomizePage from "./pages/CustomizePage"
import CheckoutPage from "./pages/CheckoutPage"
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/customize" element={<CustomizePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
