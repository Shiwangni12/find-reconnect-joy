import { useState } from "react";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

// Mock data for found items
const mockFoundItems = [
  {
    id: "2",
    title: "Blue Wallet",
    description: "Found a blue leather wallet with ID cards near Starbucks on 5th Avenue",
    category: "Personal Items",
    location: "Downtown Seattle",
    date: "1 day ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
  {
    id: "4",
    title: "Car Keys",
    description: "Found Honda car keys with red keychain in university parking lot",
    category: "Keys",
    location: "University Campus",
    date: "5 hours ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
  {
    id: "9",
    title: "Wedding Ring",
    description: "Found gold wedding ring in Central Park restroom",
    category: "Jewelry",
    location: "Central Park, NYC",
    date: "3 days ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
  {
    id: "10",
    title: "Black Cat",
    description: "Found friendly black cat, no collar, near subway station",
    category: "Pets",
    location: "Union Square",
    date: "1 day ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
  {
    id: "11",
    title: "Prescription Glasses",
    description: "Found prescription glasses in black frame at the library",
    category: "Personal Items",
    location: "Public Library",
    date: "6 hours ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
  {
    id: "12",
    title: "Child's Toy",
    description: "Found stuffed elephant toy at the playground",
    category: "Other",
    location: "Riverside Park",
    date: "2 days ago",
    image: "/placeholder.svg",
    type: "found" as const,
  },
];

const categories = ["All Categories", "Electronics", "Pets", "Personal Items", "Keys", "Jewelry", "Bags", "Other"];

const FoundItems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredItems = mockFoundItems.filter((item) => {
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Found Items</h1>
            <p className="text-muted-foreground">
              Items waiting to be claimed by their owners. Recognize something? Click to contact the finder.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search found items..."
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
              Showing {filteredItems.length} found items
            </p>
            <Button variant="success">
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
              <Button variant="success">
                Post a Found Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundItems;