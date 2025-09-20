import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, User, ArrowLeft, MessageCircle, Phone } from "lucide-react";

// Mock data - in a real app this would be fetched based on the ID
const mockItem = {
  id: "1",
  title: "iPhone 14 Pro",
  description: "Black iPhone 14 Pro lost at Central Park near the fountain. The phone has a distinctive cracked screen protector and a blue case with my initials 'J.D.' on the back. It was lost during my morning jog around 8 AM. Very important as it contains family photos and work contacts. Please contact me if found - reward offered!",
  category: "Electronics",
  location: "Central Park, NYC",
  date: "March 15, 2024",
  image: "/placeholder.svg",
  type: "lost" as const,
  user: {
    name: "John Doe",
    avatar: "/placeholder.svg",
    joinDate: "Member since 2023",
  },
  contactInfo: {
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
  }
};

const ItemDetail = () => {
  const { id } = useParams();
  
  // In a real app, you'd fetch the item based on the ID
  const item = mockItem;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          
          {/* Back button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/lost-items">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lost Items
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Image */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className={`absolute top-4 left-4 ${
                    item.type === "lost" 
                      ? "bg-warning text-warning-foreground" 
                      : "bg-success text-success-foreground"
                  }`}
                >
                  {item.type === "lost" ? "Lost Item" : "Found Item"}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
                <Badge variant="secondary" className="mb-4">{item.category}</Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{item.type === "lost" ? "Lost on" : "Found on"} {item.date}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              {/* User Info */}
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.user.name}</p>
                      <p className="text-sm text-muted-foreground">{item.user.joinDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Actions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Contact {item.type === "lost" ? "Owner" : "Finder"}</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please be respectful when contacting. Provide proof of ownership if claiming an item.
                </p>
              </div>

              {/* Report */}
              <div className="pt-4 border-t">
                <Button variant="ghost" className="text-destructive hover:text-destructive">
                  Report this listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;