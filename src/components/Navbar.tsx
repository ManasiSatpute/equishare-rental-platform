import { useState } from "react";
import { ShoppingCart, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onCategoryFilter: (category: string) => void;
  onLanguageChange: (language: string) => void;
  onLoginClick: (type: 'renter' | 'owner') => void;
  cartCount: number;
}

const categories = [
  "All Tools", "Power Tools", "Garden Tools", "Construction", "Cleaning", "Automotive"
];

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "mr", name: "मराठी" }
];

export function Navbar({ onCategoryFilter, onLanguageChange, onLoginClick, cartCount }: NavbarProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Tools");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    onLanguageChange(langCode);
  };

  return (
    <nav className="bg-white border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EquiShare
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  {selectedCategory} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-border shadow-medium">
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  {languages.find(l => l.code === selectedLanguage)?.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-border shadow-medium">
                {languages.map((language) => (
                  <DropdownMenuItem 
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  <User className="mr-2 h-4 w-4" />
                  Login <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-border shadow-medium">
                <DropdownMenuItem 
                  onClick={() => onLoginClick('renter')}
                  className="cursor-pointer hover:bg-muted"
                >
                  Login as Renter
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onLoginClick('owner')}
                  className="cursor-pointer hover:bg-muted"
                >
                  Login as Owner
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <select 
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-3 py-2 border border-border rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 border border-border rounded-md"
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>{language.name}</option>
                ))}
              </select>
              
              <Button onClick={() => onLoginClick('renter')} variant="outline" className="justify-start">
                Login as Renter
              </Button>
              <Button onClick={() => onLoginClick('owner')} variant="outline" className="justify-start">
                Login as Owner
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}