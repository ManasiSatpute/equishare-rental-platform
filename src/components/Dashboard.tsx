import { useState } from "react";
import { Plus, Package, Store, BarChart3, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardProps {
  userType: 'renter' | 'owner';
  onLogout: () => void;
}

export function Dashboard({ userType, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(userType === 'owner' ? 'products' : 'rentals');

  const renterContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Renter Dashboard</h2>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground">Currently renting</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">₹2,450</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rentals">My Rentals</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rentals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currently Renting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg"></div>
                      <div>
                        <h4 className="font-medium">Power Drill Professional</h4>
                        <p className="text-sm text-muted-foreground">Rented for 3 days • ₹150/day</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your favorite tools will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rental History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your rental history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const ownerContent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Owner Dashboard</h2>
        <div className="flex gap-2">
          <Button variant="hero">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">Listed items</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">8</div>
            <p className="text-xs text-muted-foreground">Currently rented</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹15,680</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">4.8</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="shop">Shop Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Products</h3>
            <Button variant="hero">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg"></div>
                      <div>
                        <h4 className="font-medium">Power Tool {item}</h4>
                        <p className="text-sm text-muted-foreground">₹200/day • Available</p>
                        <p className="text-xs text-muted-foreground">Rented 15 times</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Recent rental orders will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Revenue and rental analytics will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Shop Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="hero" className="w-full">
                  <Store className="mr-2 h-4 w-4" />
                  Add New Shop
                </Button>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">My Tools Shop</h4>
                  <p className="text-sm text-muted-foreground">24 products • 4.8 rating</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">Edit Shop</Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userType === 'renter' ? renterContent : ownerContent}
      </div>
    </div>
  );
}