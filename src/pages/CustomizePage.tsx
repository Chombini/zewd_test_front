"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

interface Player {
  id: number
  name: string
  number: string
}

export default function CustomizePage() {
  const [clubName, setClubName] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [orderData, setOrderData] = useState<any>(null)
  const navigate = useNavigate()

  const [newPlayerName, setNewPlayerName] = useState("")
  const [newPlayerNumber, setNewPlayerNumber] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("orderData")
    if (stored) {
      setOrderData(JSON.parse(stored))
    }
  }, [])     

  const addPlayerToList = () => {
    if (newPlayerName.trim() && newPlayerNumber.trim()) {
      const newId = players.length > 0 ? Math.max(...players.map((p) => p.id)) + 1 : 1
      setPlayers([...players, { id: newId, name: newPlayerName.trim(), number: newPlayerNumber.trim() }])
      setNewPlayerName("")
      setNewPlayerNumber("")
    }
  }

  const removePlayer = (id: number) => {
    setPlayers(players.filter((p) => p.id !== id))
  }

  const handleContinue = () => {
    const customizationData = {
      clubName,
      players: players.filter((p) => p.name.trim() || p.number.trim()),
    }

    localStorage.setItem(
      "orderData",
      JSON.stringify({
        ...orderData,
        ...customizationData,
      }),
    )

    navigate("/checkout")
  }

  const isValid = clubName.trim() && players.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          to={`/product/${orderData?.productId || 1}`}
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Product
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Customize Your Jersey</h1>
            <p className="text-gray-600">Add your club name and player details</p>
          </div>

          {orderData && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{orderData.productName}</p>
                    <p className="text-sm text-gray-600">Color: {orderData.selectedColor.name}</p>
                  </div>
                  <p className="text-xl font-bold text-green-600">${orderData.price}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Club Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clubName">Club/Team Name *</Label>
                    <Input
                      id="clubName"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      placeholder="Enter your club or team name"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Player Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <Label htmlFor="new-player-name">Player Name</Label>
                      <Input
                        id="new-player-name"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        placeholder="Enter player name"
                        className="mt-1"
                      />
                    </div>
                    <div className="w-24">
                      <Label htmlFor="new-player-number">Number</Label>
                      <Input
                        id="new-player-number"
                        value={newPlayerNumber}
                        onChange={(e) => setNewPlayerNumber(e.target.value)}
                        placeholder="##"
                        className="mt-1"
                        maxLength={2}
                      />
                    </div>
                    <Button
                      onClick={addPlayerToList}
                      disabled={!newPlayerName.trim() || !newPlayerNumber.trim()}
                      className="bg-green-600 hover:bg-green-700 mt-6"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {players.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700">Added Players:</h4>
                      {players.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-3 bg-white border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 font-semibold text-sm">{player.number}</span>
                            </div>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-gray-500">Jersey #{player.number}</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => removePlayer(player.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-4">Preview</h3>
              <div className="space-y-2">
                <p>
                  <strong>Club Name:</strong> {clubName || "Not specified"}
                </p>
                <p>
                  <strong>Players:</strong>
                </p>
                <ul className="ml-4 space-y-1">
                  {players.map((player) => (
                    <li key={player.id}>
                      {player.name} #{player.number}
                    </li>
                  ))}
                  {players.length === 0 && <li className="text-gray-500">No players added yet</li>}
                </ul>
              </div>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!isValid}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 disabled:opacity-50"
            >
              Continue to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
