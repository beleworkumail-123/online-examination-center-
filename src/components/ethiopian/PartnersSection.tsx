import { Building2, GraduationCap, Phone, Landmark, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PartnersSection = () => {
  const partners = [
    {
      name: "Ministry of Education",
      type: "Government",
      logo: "🏛️",
      description: "Official partner for national examination standards",
      color: "ethiopian-green"
    },
    {
      name: "Addis Ababa University",
      type: "University",
      logo: "🎓",
      description: "Leading research university partnership",
      color: "ethiopian-yellow"
    },
    {
      name: "Ethio Telecom",
      type: "Telecom",
      logo: "📱",
      description: "Telecommunications infrastructure support",
      color: "ethiopian-red"
    },
    {
      name: "Commercial Bank of Ethiopia",
      type: "Financial",
      logo: "🏦",
      description: "Financial services and payment gateway",
      color: "primary"
    },
    {
      name: "Bahir Dar University",
      type: "University",
      logo: "🎓",
      description: "Regional education excellence center",
      color: "success"
    },
    {
      name: "Telebirr",
      type: "Fintech",
      logo: "💳",
      description: "Mobile payment solutions provider",
      color: "warning"
    },
    {
      name: "Haramaya University",
      type: "University",
      logo: "🎓",
      description: "Agricultural and science education leader",
      color: "destructive"
    },
    {
      name: "Ethiopian Airlines",
      type: "Corporate",
      logo: "✈️",
      description: "Corporate training and certification partner",
      color: "muted"
    }
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: "Academic Recognition",
      description: "Recognized by Ethiopian Higher Education Relevance and Quality Agency (HERQA)",
      items: ["Quality assurance certified", "Academic standards compliant", "Continuous improvement"]
    },
    {
      icon: Award,
      title: "Industry Awards",
      description: "Multiple awards for educational technology innovation in East Africa",
      items: ["Best EdTech Platform 2023", "Innovation in Education Award", "Digital Excellence Recognition"]
    },
    {
      icon: CheckCircle,
      title: "Certifications",
      description: "International standards and security certifications for educational platforms",
      items: ["ISO 27001 Security", "FERPA Compliance", "Data Protection Certified"]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "Government": return Building2;
      case "University": return GraduationCap;
      case "Telecom": return Phone;
      case "Financial": return Landmark;
      case "Fintech": return Phone;
      case "Corporate": return Building2;
      default: return Building2;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Trusted </span>
            <span className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Working with leading Ethiopian institutions and organizations to deliver excellence in education.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-20">
          {partners.map((partner, index) => {
            const Icon = getIcon(partner.type);
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:scale-105">
                <CardContent className="p-6 text-center">
                  {/* Logo/Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-${partner.color}/10 to-${partner.color}/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-2xl">
                      {partner.logo}
                    </div>
                  </div>

                  {/* Partner Info */}
                  <h3 className="font-bold text-sm md:text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">{partner.type}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Recognition & Achievements</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by leading institutions and organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:scale-105">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {achievement.description}
                      </p>

                      {/* Achievement Items */}
                      <div className="space-y-2">
                        {achievement.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-full px-8 py-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">Government Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">University Partnered</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">Secure & Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;