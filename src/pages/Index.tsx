import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Dashboard } from "@/components/Dashboard";
import { useToast } from "@/hooks/use-toast";

// Import tool images
import powerDrillImg from "@/assets/power-drill.jpg";
import electricSawImg from "@/assets/electric-saw.jpg";
import lawnMowerImg from "@/assets/lawn-mower.jpg";
import pressureWasherImg from "@/assets/pressure-washer.jpg";
import ladderImg from "@/assets/ladder.jpg";
import angleGrinderImg from "@/assets/angle-grinder.jpg";

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
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Professional Power Drill",
    image: powerDrillImg,
    pricePerDay: 150,
    description: "High-performance cordless drill perfect for heavy-duty construction work.",
    category: "Power Tools",
    rating: 4.8,
    availability: true,
    fullDescription: "Professional-grade cordless power drill with 18V lithium-ion battery. Perfect for drilling through wood, metal, and masonry. Includes multiple drill bits and charging station.",
    features: ["18V Lithium-ion battery", "Variable speed control", "LED work light", "Keyless chuck"]
  },
  {
    id: "2", 
    name: "Electric Circular Saw",
    image: electricSawImg,
    pricePerDay: 200,
    description: "Precision cutting saw for wood and composite materials with safety features.",
    category: "Power Tools",
    rating: 4.7,
    availability: true,
    fullDescription: "Professional electric circular saw with 7.25-inch blade. Ideal for cutting lumber, plywood, and other building materials with precision and safety.",
    features: ["7.25-inch carbide blade", "Laser guide system", "Safety lock", "Dust collection port"]
  },
  {
    id: "3",
    name: "Lawn Mower - Self Propelled",
    image: lawnMowerImg,
    pricePerDay: 300,
    description: "Self-propelled lawn mower with mulching capability for medium to large lawns.",
    category: "Garden Tools",
    rating: 4.6,
    availability: true,
    fullDescription: "Self-propelled gas lawn mower with 21-inch cutting deck. Features multiple height adjustments and mulching capabilities for healthy lawn maintenance.",
    features: ["21-inch cutting deck", "Self-propelled drive", "Mulching capability", "Height adjustment"]
  },
  {
    id: "4",
    name: "Pressure Washer - 3000 PSI",
    image: pressureWasherImg,
    pricePerDay: 250,
    description: "High-pressure washer for cleaning driveways, decks, and outdoor surfaces.",
    category: "Cleaning",
    rating: 4.9,
    availability: false,
    fullDescription: "Commercial-grade pressure washer delivering 3000 PSI of cleaning power. Perfect for cleaning concrete, siding, decks, and vehicles.",
    features: ["3000 PSI pressure", "Gas powered engine", "Multiple nozzle attachments", "50ft high-pressure hose"]
  },
  {
    id: "5",
    name: "Extension Ladder - 20ft",
    image: ladderImg,
    pricePerDay: 100,
    description: "Professional-grade extension ladder for roofing and high-reach construction work.",
    category: "Construction",
    rating: 4.5,
    availability: true,
    fullDescription: "20-foot aluminum extension ladder with 250lb weight capacity. OSHA compliant with slip-resistant feet and secure locking mechanisms.",
    features: ["20ft maximum height", "250lb weight capacity", "Slip-resistant feet", "OSHA compliant"]
  },
  {
    id: "6",
    name: "Angle Grinder - 4.5 inch",
    image: angleGrinderImg,
    pricePerDay: 120,
    description: "Professional angle grinder for cutting and grinding metal, tile, and stone.",
    category: "Power Tools", 
    rating: 4.7,
    availability: true,
    fullDescription: "Professional 4.5-inch angle grinder with variable speed control. Ideal for cutting, grinding, and polishing various materials including metal and stone.",
    features: ["4.5-inch disc size", "Variable speed control", "Safety guard", "Side handle included"]
  }
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [userType, setUserType] = useState<'renter' | 'owner' | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const { toast } = useToast();

  const handleCategoryFilter = (category: string) => {
    if (category === "All Tools") {
      setFilteredProducts(mockProducts);
    } else {
      setFilteredProducts(mockProducts.filter(product => product.category === category));
    }
  };

  const handleLanguageChange = (language: string) => {
    // In a real app, this would change the language
    toast({
      title: "Language Changed",
      description: `Language switched to ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}`,
    });
  };

  const handleLoginClick = (type: 'renter' | 'owner') => {
    setUserType(type);
    setCurrentView('dashboard');
    toast({
      title: "Login Successful",
      description: `Welcome to your ${type} dashboard!`,
    });
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentView('home');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleOrderNow = (product: Product) => {
    toast({
      title: "Order Placed",
      description: `Your order for ${product.name} has been placed successfully!`,
    });
    setModalOpen(false);
  };

  if (currentView === 'dashboard' && userType) {
    return <Dashboard userType={userType} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onCategoryFilter={handleCategoryFilter}
        onLanguageChange={handleLanguageChange}
        onLoginClick={handleLoginClick}
        cartCount={cartItems.length}
      />
      
      <Hero />
      
      {/* Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Tools & Equipment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover professional-grade tools available for rent. Perfect for your next project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleAddToCart}
        onOrderNow={handleOrderNow}
      />
    </div>
  );
};

export default Index;
