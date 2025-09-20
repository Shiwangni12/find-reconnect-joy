import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image: string;
  type: "lost" | "found";
}

const ItemCard = ({ id, title, description, category, location, date, image, type }: ItemCardProps) => {
  return (
    <Link to={`/item/${id}`}>
      <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge 
            className={`absolute top-3 left-3 ${
              type === "lost" 
                ? "bg-warning text-warning-foreground" 
                : "bg-success text-success-foreground"
            }`}
          >
            {type === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="line-clamp-1">{location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{date}</span>
              </div>
              <Badge variant="secondary">{category}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;