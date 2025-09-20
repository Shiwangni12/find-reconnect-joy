import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

// Mock data for demonstration
const mockItems = [
  {
    id: "1",
    title: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro lost at Central Park near the fountain",
    category: "Electronics",
    location: "Central Park, NYC",
    date: "2 days ago",
    image: "/placeholder.svg",
    type: "lost" as const,
  },
  {
    id: "2", 
    title: "Blue Wallet",
    description: "Found a blue leather wallet with ID cards near Starbucks",
    category: "Personal Items",
    location: "Downtown Seattle",
    date: "1 day ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
  {
    id: "3",
    title: "Golden Retriever",
    description: "Lost golden retriever named Max, very friendly",
    category: "Pets",
    location: "Brooklyn Heights",
    date: "3 hours ago", 
    image: "/placeholder.svg",
    type: "lost" as const,
  },
  {
    id: "4",
    title: "Car Keys",
    description: "Found Honda car keys with red keychain",
    category: "Keys",
    location: "University Campus",
    date: "5 hours ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const lostItems = mockItems.filter(item => item.type === "lost");
  const foundItems = mockItems.filter(item => item.type === "found");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="People helping each other find lost items"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Lost Something?
              <br />
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                Let's Find It Together
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with your community to reunite lost items with their owners. 
              Every lost item deserves to find its way home.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for lost or found items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-white shadow-lg border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/post-item">Post Lost Item</Link>
              </Button>
              <Button variant="success" size="lg" asChild>
                <Link to="/post-item">Post Found Item</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items Sections */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Lost Items */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Recent Lost Items</h2>
                <p className="text-muted-foreground">Help reunite these items with their owners</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/lost-items" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {lostItems.map((item) => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          </div>

          {/* Found Items */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Recently Found Items</h2>
                <p className="text-muted-foreground">Items waiting to be claimed by their owners</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/found-items" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {foundItems.map((item) => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;