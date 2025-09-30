import { ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  image: string;
  pricePerDay: number;
  description: string;
  category: string;
  rating: number;
  availability: boolean;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group bg-gradient-card border-border shadow-soft hover:shadow-medium transition-bounce overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        {!product.availability && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Not Available</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-primary">
            ⭐ {product.rating}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2">{product.name}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₹{product.pricePerDay}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
            {product.category}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails(product)}
        >
          <Info className="mr-2 h-4 w-4" />
          Details
        </Button>
        <Button 
          variant="cart" 
          size="sm" 
          className="flex-1"
          onClick={() => onAddToCart(product)}
          disabled={!product.availability}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}