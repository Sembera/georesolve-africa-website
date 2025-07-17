import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type PAGE_METADATA, updatePageMetadata } from "@/utils/seo";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Facebook,
  FolderOpen,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Newspaper,
  Phone,
  Settings,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState, Suspense, lazy } from "react";

// Lazy load components for better performance
const AboutTab = lazy(() => import("./components/AboutTab"));
const ContactTab = lazy(() => import("./components/ContactTab"));
const NewsTab = lazy(() => import("./components/NewsTab"));
const ProjectsTab = lazy(() => import("./components/ProjectsTab"));
const ResourcesTab = lazy(() => import("./components/ResourcesTab"));
const ServicesTab = lazy(() => import("./components/ServicesTab"));

// Components for each tab
import HomeTab from "./components/HomeTab";

// Loading component
const TabLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center space-y-4">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4DA34D] border-r-transparent"></div>
      <p className="text-[#345363] font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Enable smooth scrolling globally and set initial metadata
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
    // Set initial metadata for homepage
    updatePageMetadata("home");
    return () => {
      document.documentElement.classList.remove("scroll-smooth");
    };
  }, []);

  // Update metadata when tab changes
  useEffect(() => {
    const tabToPageMap: Record<string, keyof typeof PAGE_METADATA> = {
      home: "home",
      about: "about",
      services: "services",
      projects: "projects",
      news: "news",
      resources: "resources",
      contact: "contact",
    };

    const pageKey = tabToPageMap[activeTab];
    if (pageKey) {
      updatePageMetadata(pageKey);
    }
  }, [activeTab]);

  // Navigation handlers
  const navigateToTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About Us", icon: Users },
    { id: "services", label: "Services", icon: Settings },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "news", label: "News & Insights", icon: Newspaper },
    { id: "resources", label: "Resources", icon: Download },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Header */}
      <header className="bg-[#345363] text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Clickable to Home */}
            <button
              onClick={() => navigateToTab("home")}
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#9EDB9E] focus:ring-offset-2 focus:ring-offset-[#345363] rounded-lg p-1"
            >
              <img
                src="https://ext.same-assets.com/1481306800/2158712194.png"
                alt="GeoResolve Logo"
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold">GeoResolve</h1>
                <p className="text-xs text-[#9EDB9E]">
                  Data Driven, Research Based
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#4DA34D] text-white shadow-lg"
                        : "text-[#9EDB9E] hover:text-white hover:bg-[#4DA34D]/80"
                    }`}
                    onClick={() => navigateToTab(tab.id)}
                  >
                    <Icon size={16} />
                    <span className="hidden xl:inline font-medium">
                      {tab.label}
                    </span>
                  </Button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-[#4DA34D]/80 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-[#4DA34D]/30 py-4 animate-in slide-in-from-top-2 duration-200">
              <nav className="grid grid-cols-2 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      className={`flex items-center justify-start space-x-2 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-[#4DA34D] text-white"
                          : "text-[#9EDB9E] hover:text-white hover:bg-[#4DA34D]/80"
                      }`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon size={16} />
                      <span className="font-medium">{tab.label}</span>
                    </Button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="mt-0">
            <HomeTab
              onNavigateToProjects={() => navigateToTab("projects")}
              onNavigateToServices={() => navigateToTab("services")}
              onNavigateToNews={() => navigateToTab("news")}
              onNavigateToContact={() => navigateToTab("contact")}
              onNavigateToResources={(toolId?: string) => {
                navigateToTab("resources");
                if (toolId) {
                  // Small delay to ensure tab has loaded before scrolling
                  setTimeout(() => {
                    const element = document.getElementById(toolId);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }, 100);
                }
              }}
            />
          </TabsContent>
          <TabsContent value="about" className="mt-0">
            <Suspense fallback={<TabLoading />}>
              <AboutTab
                onNavigateToServices={() => navigateToTab("services")}
                onNavigateToNews={() => navigateToTab("news")}
                onNavigateToContact={() => navigateToTab("contact")}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value="services" className="mt-0">
            <Suspense fallback={<TabLoading />}>
              <ServicesTab
                onNavigateToNews={() => navigateToTab("news")}
                onNavigateToContact={() => navigateToTab("contact")}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value="projects" className="mt-0">
            <Suspense fallback={<TabLoading />}>
              <ProjectsTab
                onNavigateToNews={(projectId: number) => navigateToTab("news")}
                onNavigateToContact={() => navigateToTab("contact")}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value="news" className="mt-0">
            <Suspense fallback={<TabLoading />}>
              <NewsTab />
            </Suspense>
          </TabsContent>
          <TabsContent value="resources" className="mt-0">
            <Suspense fallback={<TabLoading />}>
              <ResourcesTab
                onNavigateToContact={() => navigateToTab("contact")}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value="contact" className="mt-0">
            <Suspense fallback={<TabLoading />}>
              <ContactTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer CTA Section */}
      <section className="bg-gradient-to-r from-[#345363] to-[#4DA34D] text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-[#9EDB9E]/90 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Partner with Eastern Africa's leading geoscience experts. Get
              professional consultation and contribute to building tomorrow's
              geoscientific knowledge base.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-[#9EDB9E] hover:bg-white text-[#345363] hover:text-[#345363] font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => navigateToTab("contact")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Expert Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#9EDB9E] text-[#9EDB9E] hover:bg-[#9EDB9E] hover:text-[#345363] font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300"
                onClick={() => navigateToTab("projects")}
              >
                <FolderOpen className="mr-2 h-5 w-5" />
                View Our Projects
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto">
              <p className="text-[#9EDB9E]/80 text-sm mb-4">
                Subscribe to our research updates
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-[#9EDB9E]/30 text-white placeholder:text-[#9EDB9E]/60 focus:border-[#9EDB9E] focus:ring-[#9EDB9E]"
                />
                <Button className="bg-[#9EDB9E] hover:bg-white text-[#345363] px-6 rounded-lg font-semibold whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#345363] text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <button
                onClick={() => navigateToTab("home")}
                className="flex items-center space-x-3 mb-4 hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#9EDB9E] focus:ring-offset-2 focus:ring-offset-[#345363] rounded-lg p-1"
              >
                <img
                  src="https://ext.same-assets.com/1481306800/2158712194.png"
                  alt="GeoResolve Logo"
                  className="h-8 w-auto"
                />
                <h3 className="text-xl font-bold">GeoResolve Africa</h3>
              </button>
              <p className="text-[#9EDB9E]/80 text-sm leading-relaxed mb-6 max-w-md">
                Leading geo-engineering and geoscience consulting firm
                specializing in sustainable infrastructure development across
                Sub-Saharan Africa.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#9EDB9E]/30 text-[#9EDB9E] hover:bg-[#4DA34D] hover:border-[#4DA34D] hover:text-white p-2 rounded-lg transition-all duration-200"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#9EDB9E]/30 text-[#9EDB9E] hover:bg-[#4DA34D] hover:border-[#4DA34D] hover:text-white p-2 rounded-lg transition-all duration-200"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#9EDB9E]/30 text-[#9EDB9E] hover:bg-[#4DA34D] hover:border-[#4DA34D] hover:text-white p-2 rounded-lg transition-all duration-200"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#9EDB9E]/30 text-[#9EDB9E] hover:bg-[#4DA34D] hover:border-[#4DA34D] hover:text-white p-2 rounded-lg transition-all duration-200"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#9EDB9E]">
                Quick Links
              </h3>
              <div className="space-y-3">
                {tabs.slice(0, 4).map((tab) => (
                  <Button
                    key={tab.id}
                    variant="link"
                    className="text-white/80 hover:text-[#9EDB9E] p-0 h-auto text-sm justify-start transition-colors duration-200"
                    onClick={() => navigateToTab(tab.id)}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#9EDB9E]">
                Contact Info
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-[#4DA34D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">Email</p>
                    <a
                      href="mailto:info@georesolveafrica.com"
                      className="text-white hover:text-[#9EDB9E] transition-colors duration-200"
                    >
                      info@georesolveafrica.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-[#4DA34D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">Phone</p>
                    <a
                      href="tel:+256771999614"
                      className="text-white hover:text-[#9EDB9E] transition-colors duration-200"
                    >
                      +256-771999614
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-4 w-4 text-[#4DA34D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">WhatsApp</p>
                    <a
                      href="https://wa.me/256771999614"
                      className="text-white hover:text-[#9EDB9E] transition-colors duration-200"
                    >
                      +256-771999614
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-[#4DA34D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">Location</p>
                    <p className="text-white">
                      Gayaza-Kampala Road
                      <br />
                      Kampala, Uganda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-[#4DA34D]/30" />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left text-white/60 text-sm">
              © 2025 GeoResolve Africa. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button className="text-white/60 hover:text-[#9EDB9E] transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-white/60 hover:text-[#9EDB9E] transition-colors duration-200">
                Terms of Service
              </button>
              <button className="text-white/60 hover:text-[#9EDB9E] transition-colors duration-200">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
