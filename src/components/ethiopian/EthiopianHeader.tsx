import { useState } from "react";
import { Menu, X, Globe, User, UserPlus, ChevronDown, BookOpen, GraduationCap, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logoImage from "@/assets/ethiopian-edu-logo.png";

const EthiopianHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "am", name: "አማርኛ", flag: "🇪🇹" },
    { code: "om", name: "Afaan Oromoo", flag: "🇪🇹" }
  ];

  const examTypes = [
    { 
      name: "Entrance Exam", 
      href: "/entrance-exams", 
      icon: GraduationCap,
      description: "University and college entrance examinations"
    },
    { 
      name: "Exit Exam", 
      href: "/exit-exams", 
      icon: BookOpen,
      description: "Final examinations for degree completion"
    },
    { 
      name: "Work Exam", 
      href: "/work-exams", 
      icon: Briefcase,
      description: "Professional certification and work-related exams"
    },
    { 
      name: "NGAT", 
      href: "/ngat-exams", 
      icon: Award,
      description: "National Graduate Aptitude Test"
    }
  ];

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "AI", href: "/ai" },
    { name: "Subscription", href: "/subscription" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="EthioStudyHub Logo" 
              className="h-10 w-10 rounded-lg shadow-sm"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red bg-clip-text text-transparent">
                EthioStudyHub
              </h1>
              <p className="text-xs text-muted-foreground">Academic Excellence Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 pt-6 pb-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full px-3 py-2"
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Exam Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-foreground hover:text-primary transition-colors hover:bg-transparent">
                    <span>
                      Exam
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100] bg-background border border-border shadow-lg">
                    <div className="grid w-[420px] gap-2 p-3 bg-background">
                      {examTypes.map((exam) => {
                        const Icon = exam.icon;
                        return (
                          <NavigationMenuLink key={exam.name} asChild>
                            <Link
                              to={exam.href}
                              className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group bg-background border border-transparent hover:border-primary/20"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-primary/20">
                                  <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-semibold leading-none text-foreground group-hover:text-primary">{exam.name}</div>
                                  <p className="text-xs leading-snug text-muted-foreground mt-1">
                                    {exam.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other Menu Items */}
                {menuItems.slice(1).map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.href}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full px-3 py-2"
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{languages.find(l => l.code === language)?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="flex items-center space-x-2"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth")}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-primary to-primary-variant hover:from-primary/90 hover:to-primary-variant/90 flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="py-4 space-y-3">
              {/* Home */}
              <a
                href="/"
                className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              
              {/* Exam Types */}
              <div className="px-4">
                <div className="text-sm font-medium text-foreground mb-2">Exams</div>
                <div className="pl-4 space-y-2">
                  {examTypes.map((exam) => {
                    const Icon = exam.icon;
                    return (
                      <a
                        key={exam.name}
                        href={exam.href}
                        className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        {exam.name}
                      </a>
                    );
                  })}
                </div>
              </div>
              
              {/* Other Menu Items */}
              {menuItems.slice(1).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-primary to-primary-variant justify-start"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EthiopianHeader;