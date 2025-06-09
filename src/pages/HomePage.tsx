import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function HomePage() {
  const products = [
    {
      id: 1,
      name: "Classic Football Jersey",
      price: 29.99,
      image: "/placeholder.png",
      description: "Premium quality football jersey perfect for teams",
    },
    {
      id: 2,
      name: "Sports T-Shirt",
      price: 24.99,
      image: "/placeholder.png",
      description: "Comfortable sports t-shirt for active wear",
    },
    {
      id: 3,
      name: "Team Jersey Pro",
      price: 34.99,
      image: "/placeholder.png",
      description: "Professional grade team jersey with custom options",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Custom Team Jerseys</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create personalized jerseys for your team. Choose your style, colors, and add custom names and numbers.
          </p>  
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">{product.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  <Link to={`/product/${product.id}`}>
                    <Button className="bg-green-600 hover:bg-green-700">Select Product</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Product</h3>
                <p className="text-sm text-gray-600">Select your preferred t-shirt style</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Pick Colors</h3>
                <p className="text-sm text-gray-600">Choose from 5 available colors</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Customize</h3>
                <p className="text-sm text-gray-600">Add club name and player details</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Order</h3>
                <p className="text-sm text-gray-600">Complete your order details</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
