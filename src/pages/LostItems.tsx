import { useState } from "react";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

// Mock data - in a real app this would come from an API
const mockLostItems = [
  {
    id: "1",
    title: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro lost at Central Park near the fountain. Has a cracked screen protector.",
    category: "Electronics",
    location: "Central Park, NYC",
    date: "2 days ago",
    image: "/placeholder.svg",
    type: "lost" as const,
  },
  {
    id: "3",
    title: "Golden Retriever - Max",
    description: "Lost golden retriever named Max, very friendly, wearing a blue collar",
    category: "Pets",
    location: "Brooklyn Heights",
    date: "3 hours ago", 
    image: "/placeholder.svg",
    type: "lost" as const,
  },
  {
    id: "5",
    title: "Silver Watch",
    description: "Lost my father's silver watch with brown leather strap",
    category: "Jewelry",
    location: "Madison Square Garden",
    date: "1 week ago",
    image: "/placeholder.svg",
    type: "lost" as const,
  },
  {
    id: "6",
    title: "Black Backpack",
    description: "Black Nike backpack with laptop and important documents",
    category: "Bags",
    location: "Times Square",
    date: "4 days ago",
    image: "/placeholder.svg",
    type: "lost" as const,
  },
  {
    id: "7",
    title: "Car Keys - Toyota",
    description: "Toyota car keys with house keys on a red keychain",
    category: "Keys",
    location: "Brooklyn Bridge",
    date: "6 hours ago",
    image: "/placeholder.svg",
    type: "lost" as const,
  },
  {
    id: "8",
    title: "Blue Wallet",
    description: "Blue leather wallet with credit cards and driver's license",
    category: "Personal Items",
    location: "Central Station", 
    date: "2 days ago",
    image: "/placeholder.svg",
    type: "lost" as const,
  },
];

const categories = ["All Categories", "Electronics", "Pets", "Personal Items", "Keys", "Jewelry", "Bags", "Other"];

const LostItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredItems = mockLostItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesLocation = locationFilter === "" || 
                           item.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Lost Items</h1>
            <p className="text-muted-foreground">
              Help reunite these items with their owners. Found something? Click on an item to contact the owner.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search lost items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredItems.length} lost items
            </p>
            <Button variant="hero">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p>Try adjusting your search criteria or check back later.</p>
              </div>
              <Button variant="hero">
                Post a Lost Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostItems;