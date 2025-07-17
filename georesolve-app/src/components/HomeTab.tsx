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
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ANIMATIONS,
  BUTTON_STYLES,
  CARD_STYLES,
  SPACING,
  TYPOGRAPHY,
} from "@/styles/shared";
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  ExternalLink,
  FileText,
  FlaskConical,
  Globe,
  Hammer,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

const HomeTab = ({
  onNavigateToProjects,
  onNavigateToServices,
  onNavigateToNews,
  onNavigateToContact,
  onNavigateToResources,
}: {
  onNavigateToProjects: () => void;
  onNavigateToServices: () => void;
  onNavigateToNews: () => void;
  onNavigateToContact: () => void;
  onNavigateToResources: (toolId?: string) => void;
}) => {
  const coreServices = [
    {
      icon: Hammer,
      title: "Geo-Engineering",
      description:
        "Comprehensive geotechnical investigations, foundation engineering, and slope stability analysis for infrastructure projects across Africa's Great Lakes region.",
      features: [
        "Site Investigations",
        "Foundation Design",
        "Slope Stability",
        "Ground Improvement",
      ],
    },
    {
      icon: Globe,
      title: "Geo-Spatial Analysis",
      description:
        "Advanced GIS mapping, remote sensing, and spatial data analysis using cutting-edge technology for precise project planning and decision-making.",
      features: [
        "GIS Mapping",
        "Remote Sensing",
        "Spatial Analysis",
        "3D Modeling",
      ],
    },
    {
      icon: FlaskConical,
      title: "Laboratory Testing",
      description:
        "State-of-the-art materials testing and quality control services contributing to our comprehensive geoscientific database.",
      features: [
        "Materials Testing",
        "Quality Control",
        "Soil Analysis",
        "Rock Testing",
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: Database,
      title: "Research-Based Innovation",
      description:
        "Building Eastern Africa's largest geoscientific database while delivering cutting-edge solutions",
    },
    {
      icon: BarChart3,
      title: "Data-Centered Solutions",
      description:
        "Empowering decisions with advanced geospatial analysis and comprehensive data insights",
    },
    {
      icon: Award,
      title: "7+ Years Regional Expertise",
      description:
        "Deep understanding of Africa's Great Lakes region geological conditions and challenges",
    },
    {
      icon: Users,
      title: "Knowledge-Base Contributors",
      description:
        "Every project contributes to tomorrow's geoscientific knowledge-base for the region",
    },
  ];

  const featuredProjects = [
    {
      title: "Geotechnical Investigations services for Jiji Hp Project",
      location: "Matana, Burundi",
      description:
        "Comprehensive geotechnical investigation services for hydropower project including drilling operations, geotechnical engineering analysis, and laboratory testing with slope stability assessment.",
      image: "/Core_box_002.jpeg",
      category: "Energy",
    },
    {
      title:
        "10.3km 2D Electrical Resistivity Survey for the Isingiro water Supply Project",
      location: "Isingiro, Uganda",
      description:
        "Extensive 2D electrical resistivity survey covering 10.3km for water supply infrastructure project contributing valuable geophysical data to our regional database.",
      image: "https://ext.same-assets.com/1481306800/4293833688.jpeg",
      category: "Infrastructure",
    },
    {
      title:
        "Geotechnical and Topographical Survey services for Mutambu 1MW HP Project",
      location: "Mutambu, Burundi",
      description:
        "Integrated geotechnical and topographical survey services for 1MW hydropower project including geophysical surveys, drilling operations, and aerial topography surveys.",
      image: "/Mutambu.jpeg",
      category: "Energy",
    },
  ];

  const recentNews = [
    {
      title: "Building Eastern Africa's Largest Geoscientific Database",
      date: "December 2024",
      category: "Research",
      excerpt:
        "How our research-based business model is revolutionizing geoscientific knowledge in the Great Lakes region...",
    },
    {
      title: "Data-Centered Solutions for Infrastructure Development",
      date: "November 2024",
      category: "Innovation",
      excerpt:
        "Empowering decision-making through advanced geospatial analysis and comprehensive data insights...",
    },
    {
      title: "Research-Based Engineering: Pioneering African Solutions",
      date: "October 2024",
      category: "Research",
      excerpt:
        "How our innovative approach is contributing to tomorrow's geoscientific knowledge-base...",
    },
  ];

  const partners = [
    {
      name: "AECOM",
      logo: "https://ext.same-assets.com/1481306800/1330335853.png",
    },
    {
      name: "KCCA",
      logo: "https://ext.same-assets.com/1481306800/4225542344.png",
    },
    {
      name: "SONGA ENERGY",
      logo: "https://ext.same-assets.com/1481306800/1793645631.png",
    },
    {
      name: "RAZEL-BEC",
      logo: "https://ext.same-assets.com/1481306800/1330335853.png",
    },
  ];

  return (
    <div
      className="space-y-0"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/People_2.jpeg"
            alt="GeoResolve team members in the field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 to-slate-900/35" />
        </div>

        {/* Video Play Button */}
        <div className="absolute top-8 right-8 z-20">
          <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-full px-6 py-3">
            <Play className="h-5 w-5 mr-2" />
            Watch Our Story
          </Button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-6xl mx-auto space-y-8">
            <Badge className="bg-orange-500 text-white border-orange-500 text-lg px-6 py-2 font-medium">
              Africa's Great Lakes Region Geo-Data Specialists
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="block">Indepth, Integrated</span>
              <span className="block text-emerald-400">
                Solving, Finding, & Sustaining
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-light">
              Data-Centered Solutions empowering decisions with advanced
              geospatial analysis. Building Eastern Africa's largest
              geoscientific database while delivering innovative solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-6 rounded-full font-semibold shadow-xl"
                onClick={onNavigateToContact}
              >
                <Phone className="mr-3 h-5 w-5" />
                Get Expert Consultation
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 text-lg px-10 py-6 rounded-full font-semibold"
                onClick={() => onNavigateToResources()}
              >
                Explore Our Database
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  50+
                </div>
                <div className="text-slate-300 font-medium">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  7+
                </div>
                <div className="text-slate-300 font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  4
                </div>
                <div className="text-slate-300 font-medium">
                  Countries Served
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  #1
                </div>
                <div className="text-slate-300 font-medium">
                  Regional Database
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
              About GeoResolve Africa
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              About GeoResolve Africa At GeoResolve Africa, we are dedicated to
              delivering high-quality geo-data solutions that power
              infrastructure and development across Sub-Saharan Africa. Our
              multidisciplinary team brings together expertise in geophysics,
              geotechnical engineering, geo-spatial surveying, and advanced
              laboratory testing to help you make confident, data-driven
              decisions. Whether supporting construction, mining, energy, or
              environmental projects, we deliver accurate, reliable insights you
              can trust..
            </p>
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                We have a research-based business model and are determined to
                build the largest database of geoscientific data in Eastern
                Africa. By entrusting your project with us, you will be
                contributing to the geoscientific knowledge-base of tomorrow.
              </p>
              <Badge className="bg-emerald-500 text-white text-base px-6 py-2">
                Research-Based Engineering Company
              </Badge>
            </div>
          </div>

          {/* Our Journey Section */}
          <div className="max-w-6xl mx-auto mt-24">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
              Our Journey
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* 2018 - Conception */}
              <div className="text-center group">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg">
                  <img
                    src="/Conception_2018_vintage.jpeg"
                    alt="GeoResolve Africa conception in 2018 - founding team and early vision"
                    className="w-full h-64 sm:h-72 md:h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 text-white font-bold text-lg px-4 py-2 shadow-md">
                      2018
                    </Badge>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  Conception & Vision
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  GeoResolve Africa was conceived with the vision to build
                  Eastern Africa's largest geoscientific database while
                  delivering innovative solutions.
                </p>
              </div>

              {/* 2020 - Growth */}
              <div className="text-center group">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg">
                  <img
                    src="/2020.jpg"
                    alt="GeoResolve Africa team growth and expansion in 2020"
                    className="w-full h-64 sm:h-72 md:h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 text-white font-bold text-lg px-4 py-2 shadow-md">
                      2020
                    </Badge>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  Growth & Development
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Expanded our team and capabilities, establishing partnerships
                  and building our research-based engineering approach across
                  the region.
                </p>
              </div>

              {/* 2022 - First International Project */}
              <div className="text-center group">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg">
                  <img
                    src="/First_project_in_Burundi.jpg"
                    alt="GeoResolve Africa first international project in Burundi 2022"
                    className="w-full h-64 sm:h-72 md:h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 text-white font-bold text-lg px-4 py-2 shadow-md">
                      2022
                    </Badge>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  International Expansion
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Launched our first major international project in Burundi,
                  marking our expansion across the Great Lakes region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className={TYPOGRAPHY.sectionTitle}>Our Core Services</h2>
            <p className={TYPOGRAPHY.sectionSubtitle}>
              Data-centered solutions tailored for Africa's Great Lakes region
              infrastructure development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className={`${CARD_STYLES.interactive} bg-white`}
                >
                  <CardHeader className="text-center pb-6">
                    <div className="mx-auto mb-6 p-6 bg-[#9EDB9E]/20 rounded-2xl w-fit group-hover:bg-[#4DA34D] transition-all duration-500">
                      <Icon className="h-12 w-12 text-[#4DA34D] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <CardTitle className={`${TYPOGRAPHY.cardTitle} text-2xl`}>
                      {service.title}
                    </CardTitle>
                    <CardDescription
                      className={`${TYPOGRAPHY.cardDescription} text-lg`}
                    >
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#4DA34D] mr-3 flex-shrink-0" />
                          <span className="text-stone-600 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full ${BUTTON_STYLES.primary} py-3`}
                      onClick={onNavigateToServices}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Why Choose GeoResolve
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Research-based innovation building tomorrow's geoscientific
              knowledge-base
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;

              // Determine navigation based on title
              const getNavigationHandler = () => {
                switch (item.title) {
                  case "Research-Based Innovation":
                  case "Knowledge-Base Contributors":
                    return onNavigateToNews;
                  case "Data-Centered Solutions":
                  case "7+ Years Regional Expertise":
                    return onNavigateToProjects;
                  default:
                    return undefined;
                }
              };

              const handleClick = getNavigationHandler();

              return (
                <div
                  key={index}
                  className={`text-center group hover:scale-105 transition-transform duration-300 ${
                    handleClick ? "cursor-pointer" : ""
                  }`}
                  onClick={handleClick}
                >
                  <div className="mx-auto mb-6 p-6 bg-white rounded-full w-fit shadow-lg group-hover:shadow-xl group-hover:bg-emerald-500 transition-all duration-300">
                    <Icon className="h-10 w-10 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Contributing to Eastern Africa's geoscientific knowledge through
              precision engineering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-slate-200 hover:border-emerald-400"
              >
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} - ${project.location} project showing geotechnical and engineering work`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    priority={index < 3}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 text-white font-semibold">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="p-8">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-slate-500 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {project.location}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-full font-semibold"
                    onClick={onNavigateToNews}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              className="bg-slate-900 hover:bg-orange-500 text-white px-10 py-4 rounded-full font-semibold text-lg"
              onClick={onNavigateToProjects}
            >
              View All Projects
              <ExternalLink className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* News & Insights Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Latest Research & Insights
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Stay informed with cutting-edge developments in African geoscience
              research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((article, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-emerald-400 bg-white"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Badge
                      variant="outline"
                      className="border-emerald-500 text-emerald-600 font-semibold"
                    >
                      {article.category}
                    </Badge>
                    <span className="text-sm text-slate-500 font-medium">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 text-emerald-600 hover:text-orange-500 font-semibold"
                    onClick={onNavigateToNews}
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              variant="outline"
              className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-10 py-4 rounded-full font-semibold text-lg"
              onClick={onNavigateToNews}
            >
              Visit Our Research Blog
              <ExternalLink className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* GeoResolve Free Tools Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              GeoResolve Free Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Professional calculation tools designed for Eastern Africa's
              geoscience community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Coordinate Converter */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-emerald-400 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Globe className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  Coordinate Converter
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Easily convert coordinates across local and global systems for
                  Eastern Africa.
                </p>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  onClick={() =>
                    onNavigateToResources("coordinate-conversion-tool")
                  }
                >
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Decimal Degrees ↔ DMS Converter */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-emerald-400 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6 group-hover:bg-emerald-200 transition-colors">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  Decimal Degrees ↔ DMS Converter
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Convert between decimal degrees and degrees-minutes-seconds
                  instantly.
                </p>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  onClick={() => onNavigateToResources("dms-conversion-tool")}
                >
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* KML File Generator */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-emerald-400 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6 group-hover:bg-emerald-200 transition-colors">
                  <FileText className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  KML File Generator
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Quickly generate KML files from your coordinates for mapping
                  applications.
                </p>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  onClick={() => onNavigateToResources("kml-generation-tool")}
                >
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 italic">
              Our tools are free to use and developed to advance geoscience in
              Eastern Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Partners & Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Trusted Research Partners
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Collaborative partnerships advancing Africa's geoscientific
              knowledge
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity duration-500">
            {partners.map((partner, index) => (
              <div
                key={partner.name || index}
                className="grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
              >
                <OptimizedImage
                  src={partner.logo}
                  alt={`${partner.name} - GeoResolve trusted research partner logo`}
                  className="h-16 md:h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Research Community
            </h2>
            <p className="text-xl text-slate-300 mb-12 font-light">
              Subscribe for the latest research insights, database updates, and
              geoscientific discoveries
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                placeholder="Enter your email address"
                className="bg-white text-slate-900 border-white flex-1 h-14 rounded-full px-6 text-lg"
              />
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-10 rounded-full font-semibold text-lg"
                onClick={onNavigateToContact}
              >
                Join Research Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-sm text-slate-400 mt-6 font-light">
              Join researchers and professionals building tomorrow's
              knowledge-base.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeTab;
