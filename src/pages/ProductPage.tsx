import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowLeft } from "lucide-react"

const colors = [
  { id: "red", name: "Red", hex: "#DC2626", image: "/red-jersey.png" },
  { id: "blue", name: "Blue", hex: "#2563EB", image: "/blue-jersey.png" },
  { id: "green", name: "Green", hex: "#16A34A", image: "/green-jersey.png" },
  { id: "black", name: "Black", hex: "#1F2937", image: "/black-jersey.png" },
  { id: "white", name: "White", hex: "#F9FAFB", image: "/white-jersey.png" },
]

const products = {
  1: { name: "Classic Football Jersey", price: 29.99 },
  2: { name: "Sports T-Shirt", price: 24.99 },
  3: { name: "Team Jersey Pro", price: 34.99 },
}

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const productId = Number.parseInt(id || "1")
  const product = products[productId as keyof typeof products]

  const handleContinue = () => {
    // Store selection in localStorage for demo purposes
    localStorage.setItem(
      "orderData",
      JSON.stringify({
        productId,
        productName: product.name,
        price: product.price,
        selectedColor: selectedColor,
      }),
    )
    navigate("/customize")
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={selectedColor.image || "/placeholder.png"}
                  alt={`${product.name} in ${selectedColor.name}`}
                  className="w-full h-96 object-cover"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                    selectedColor.id === color.id
                      ? "border-green-500 ring-2 ring-green-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={color.image || "/placeholder.png"}
                    alt={`${product.name} in ${color.name}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-green-600 mb-6">${product.price}</p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Selected Color: {selectedColor.name}</h3>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="text-gray-700">{selectedColor.name}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Premium quality fabric</li>
                  <li>• Custom name and number printing</li>
                  <li>• Available in 5 colors</li>
                  <li>• Professional team jersey design</li>
                  <li>• Comfortable fit for all activities</li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Next Steps:</h3>
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-gray-600 mb-4">
                  After selecting your color, you'll be able to customize your jersey with:
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Club/Team name</li>
                  <li>• Player names and numbers</li>
                  <li>• Contact information</li>
                </ul>
              </div>
            </div>

            <Button onClick={handleContinue} className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
              Continue to Customization
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
