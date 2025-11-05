import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-elegant">
              <Calendar className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Etiko
            </h1>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-4xl">
            Discover Events That
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Inspire You</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Your premier destination for booking unforgettable experiences. From concerts to conferences, find and book tickets to the events that matter to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-elegant text-lg px-8">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 text-lg px-8 hover:bg-muted/50 transition-all">
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-16 max-w-5xl w-full">
            <div className="p-6 bg-card rounded-xl shadow-card border border-border/50 backdrop-blur-sm hover:shadow-elegant transition-all">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">Book tickets in seconds with our streamlined, user-friendly process</p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-card border border-border/50 backdrop-blur-sm hover:shadow-elegant transition-all">
              <div className="p-3 bg-secondary/10 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Protected transactions with 2FA authentication for your peace of mind</p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-card border border-border/50 backdrop-blur-sm hover:shadow-elegant transition-all">
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">Browse thousands of events across multiple categories and locations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


