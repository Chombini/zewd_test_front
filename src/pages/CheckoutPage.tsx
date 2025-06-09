import { useState, useEffect, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const [orderData, setOrderData] = useState<any>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
  })

  useEffect(() => {
    const stored = localStorage.getItem("orderData")
    if (stored) {
      setOrderData(JSON.parse(stored))
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const completeOrder = {
      ...orderData,
      customerInfo: formData,
      orderDate: new Date().toISOString(),
      orderId: `ORD-${Date.now()}`,
    };
  
    localStorage.setItem("completeOrder", JSON.stringify(completeOrder));
  
    try {
      // Send order to server
      const response = await fetch("https://zewd-test-backend.onrender.com/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeOrder),
      });
  
      if (!response.ok) throw new Error("Server error");
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Order submission failed. Please try again.");
    }
  };

  const isValid = formData.fullName && formData.email && formData.phone

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll contact you soon to confirm the details and arrange production.
            </p>
            <Link to="/">
              <Button className="bg-green-600 hover:bg-green-700">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/customize" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customization
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Complete Your Order</h1>
            <p className="text-gray-600">Enter your contact information to finalize your custom jersey order</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {orderData && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{orderData.productName}</p>
                          <p className="text-sm text-gray-600">Color: {orderData.selectedColor?.name}</p>
                        </div>
                        <p className="text-xl font-bold text-green-600">${orderData.price}</p>
                      </div>

                      <div className="border-t pt-4">
                        <p className="font-semibold mb-2">Club: {orderData.clubName}</p>
                        <p className="text-sm text-gray-600 mb-2">Players:</p>
                        <ul className="text-sm space-y-1">
                          {orderData.players?.map((player: any, index: number) => (
                            <li key={index}>
                              • {player.name} #{player.number}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-green-600">${orderData.price}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter your address"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Enter your city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="Enter zip code"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Special Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        placeholder="Any special instructions or notes for your order"
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isValid}
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 disabled:opacity-50"
                    >
                      Submit Order & Buy
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
