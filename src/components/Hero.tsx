import { Search, Wrench, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-gradient-hero text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rent Tools & Equipment
            <span className="block text-white/90">When You Need Them</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Access professional-grade tools and equipment without the commitment. 
            Perfect for DIY projects, professional work, or one-time needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="secondary" size="lg" className="font-semibold">
              <Search className="mr-2 h-5 w-5" />
              Browse Tools
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Users className="mr-2 h-5 w-5" />
              List Your Tools
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
              <p className="text-white/70">All tools are maintained to professional standards and regularly inspected.</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-white/70">Every rental is covered by comprehensive insurance for your peace of mind.</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-white/70">Get help whenever you need it with our round-the-clock customer support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}