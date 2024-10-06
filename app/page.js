'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, User, Sunrise, Sunset, MapPin } from 'lucide-react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '200px'
}

const center = {
  lat: 0,
  lng: 0
}

export default function NamazAuthWithMap() {
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState('')
  const [mapCenter, setMapCenter] = useState(center)
  const mapRef = useRef(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API
  })

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setMapCenter({ lat, lng })
    setLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
  }, [])

  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg border-0">
        <CardHeader className="space-y-1 bg-green-600 text-white rounded-t-lg">
          <div className="flex items-center justify-center space-x-2">
            <div className="relative w-10 h-10">
              <Sunrise className="absolute h-8 w-8 text-yellow-300" />
              <Sunset className="absolute h-6 w-6 text-orange-400 right-0 bottom-0" />
            </div>
            <CardTitle className="text-2xl font-bold">Namaz Time</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-green-100">
              <TabsTrigger value="signin" className="data-[state=active]:bg-white">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-white">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin" className="text-sm font-medium text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
                    <Input 
                      id="email-signin" 
                      type="email" 
                      placeholder="m@example.com" 
                      required 
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin" className="text-sm font-medium text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
                    <Input 
                      id="password-signin" 
                      type="password" 
                      required 
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-register" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
                    <Input 
                      id="name-register" 
                      type="text" 
                      placeholder="John Doe" 
                      required 
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register" className="text-sm font-medium text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
                    <Input 
                      id="email-register" 
                      type="email" 
                      placeholder="m@example.com" 
                      required 
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register" className="text-sm font-medium text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
                    <Input 
                      id="password-register" 
                      type="password" 
                      required 
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                {isLoaded && (
                  <div className="h-[200px] w-full rounded-md overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={mapCenter}
                      zoom={2}
                      onClick={onMapClick}
                      onLoad={onMapLoad}
                    >
                      <Marker position={mapCenter} />
                    </GoogleMap>
                  </div>
                )}
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}