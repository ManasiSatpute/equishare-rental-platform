import { X, ShoppingCart, Calendar, Star, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  image: string;
  pricePerDay: number;
  description: string;
  category: string;
  rating: number;
  availability: boolean;
  fullDescription?: string;
  features?: string[];
  specs?: Record<string, string>;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOrderNow: (product: Product) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart, onOrderNow }: ProductModalProps) {
  if (!product) return null;

  const defaultFeatures = [
    "Professional grade quality",
    "Regular maintenance done",
    "Insurance covered",
    "24/7 customer support"
  ];

  const defaultSpecs = {
    "Brand": "Professional Grade",
    "Condition": "Excellent",
    "Weight": "As per manufacturer specs",
    "Warranty": "Rental period covered"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 z-10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-80 md:h-96 object-cover rounded-lg shadow-medium"
              />
              {!product.availability && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="text-white font-semibold text-xl">Not Available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{product.name}</h2>
                <p className="text-muted-foreground">
                  {product.fullDescription || product.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-card p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-primary">₹{product.pricePerDay}</span>
                  <span className="text-muted-foreground">/day</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• Minimum rental: 1 day</p>
                  <p>• Weekly discounts available</p>
                  <p>• Free delivery within 10km</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {(product.features || defaultFeatures).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specs || defaultSpecs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="cart" 
                  className="flex-1"
                  onClick={() => onAddToCart(product)}
                  disabled={!product.availability}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => onOrderNow(product)}
                  disabled={!product.availability}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Order Now
                </Button>
              </div>

              {/* Additional Info */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span>Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}