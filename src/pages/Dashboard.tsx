import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, User, Mail, MapPin } from "lucide-react";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  avatar: "/placeholder.svg",
  joinDate: "March 2023",
  location: "New York, NY",
  itemsPosted: 12,
  itemsReturned: 8,
};

// Mock user's items
const mockUserItems = [
  {
    id: "1",
    title: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro lost at Central Park near the fountain",
    category: "Electronics",
    location: "Central Park, NYC",
    date: "2 days ago",
    image: "/placeholder.svg",
    type: "lost" as const,
    status: "active",
  },
  {
    id: "2", 
    title: "Blue Wallet",
    description: "Found a blue leather wallet with ID cards near Starbucks",
    category: "Personal Items",
    location: "Downtown Seattle",
    date: "1 week ago",
    image: "/placeholder.svg",
    type: "found" as const,
    status: "claimed",
  },
  {
    id: "3",
    title: "Car Keys",
    description: "Found Honda car keys with red keychain",
    category: "Keys",
    location: "University Campus",
    date: "3 days ago",
    image: "/placeholder.svg",
    type: "found" as const,
    status: "active",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const activeItems = mockUserItems.filter(item => item.status === "active");
  const claimedItems = mockUserItems.filter(item => item.status === "claimed");
  const lostItems = mockUserItems.filter(item => item.type === "lost");
  const foundItems = mockUserItems.filter(item => item.type === "found");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback className="text-2xl">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {mockUser.email}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockUser.location}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Member since {mockUser.joinDate}</p>
                </div>
                
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{mockUser.itemsPosted}</div>
                <div className="text-muted-foreground">Items Posted</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-success mb-2">{mockUser.itemsReturned}</div>
                <div className="text-muted-foreground">Items Returned</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">{activeItems.length}</div>
                <div className="text-muted-foreground">Active Listings</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="lost">Lost Items ({lostItems.length})</TabsTrigger>
                <TabsTrigger value="found">Found Items ({foundItems.length})</TabsTrigger>
              </TabsList>
              
              <Button variant="hero" asChild>
                <Link to="/post-item">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Item
                </Link>
              </Button>
            </div>

            <TabsContent value="overview" className="space-y-6">
              {/* Active Items */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Active Listings</h2>
                {activeItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeItems.map((item) => (
                      <div key={item.id} className="relative">
                        <ItemCard {...item} />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No active listings. Post an item to get started!</p>
                  </div>
                )}
              </div>

              {/* Recently Claimed */}
              {claimedItems.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recently Claimed</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {claimedItems.map((item) => (
                      <div key={item.id} className="relative opacity-75">
                        <ItemCard {...item} />
                        <Badge className="absolute top-2 left-2 bg-success">Claimed</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="lost">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lostItems.map((item) => (
                  <div key={item.id} className="relative">
                    <ItemCard {...item} />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="found">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foundItems.map((item) => (
                  <div key={item.id} className="relative">
                    <ItemCard {...item} />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;