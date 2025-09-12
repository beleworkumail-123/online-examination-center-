import { Shield, Smartphone, Zap, CheckCircle, Lock, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const KeyFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Proctoring",
      description: "Advanced AI-powered monitoring and human supervision ensure exam integrity with anti-cheating technology.",
      gradient: "from-ethiopian-green to-ethiopian-green/80",
      bgGradient: "from-ethiopian-green/10 to-ethiopian-green/5",
      details: ["Real-time monitoring", "Face recognition", "Browser lockdown", "Plagiarism detection"]
    },
    {
      icon: Smartphone,
      title: "Accessible Anywhere",
      description: "Works seamlessly on mobile devices and low-bandwidth connections, reaching students across Ethiopia.",
      gradient: "from-ethiopian-yellow to-ethiopian-yellow/80",
      bgGradient: "from-ethiopian-yellow/10 to-ethiopian-yellow/5",
      details: ["Mobile-first design", "Offline capability", "Low-bandwidth support", "Multi-device sync"]
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback and detailed analytics with AI-powered grading and personalized recommendations.",
      gradient: "from-ethiopian-red to-ethiopian-red/80",
      bgGradient: "from-ethiopian-red/10 to-ethiopian-red/5",
      details: ["Real-time scoring", "Detailed analytics", "Performance insights", "Progress tracking"]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            <span className="text-foreground">Why Choose </span>
            <span className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
              EthioStudyHub?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Built specifically for Ethiopian students with cutting-edge technology and deep understanding of local educational needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:scale-105"
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 sm:h-10 sm:w-10 text-primary`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 sm:space-y-3">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
          <div className="group">
            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-4 sm:p-6 mb-4 group-hover:scale-105 transition-transform">
              <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-success mx-auto mb-2" />
              <div className="font-bold text-sm sm:text-lg text-foreground">256-bit</div>
              <div className="text-xs sm:text-sm text-muted-foreground">SSL Encryption</div>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 sm:p-6 mb-4 group-hover:scale-105 transition-transform">
              <Wifi className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
              <div className="font-bold text-sm sm:text-lg text-foreground">99.9%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl p-4 sm:p-6 mb-4 group-hover:scale-105 transition-transform">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-warning mx-auto mb-2" />
              <div className="font-bold text-sm sm:text-lg text-foreground">&lt;2s</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Load Time</div>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl p-4 sm:p-6 mb-4 group-hover:scale-105 transition-transform">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-destructive mx-auto mb-2" />
              <div className="font-bold text-sm sm:text-lg text-foreground">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;