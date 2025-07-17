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
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  ExternalLink,
  Eye,
  Filter,
  Image,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Search,
  Tag,
  Target,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useState } from "react";
import NewsletterSignup from "./NewsletterSignup";

interface Article {
  id: number;
  title: string;
  category: "energy" | "infrastructure" | "mining" | "environment";
  location: string;
  client: string;
  period: string;
  year: string;
  image: string;
  excerpt: string;
  services: string[];
  challenges: string;
  solution: string;
  publishDate: string;
  readTime: string;
}

interface Category {
  id: string;
  label: string;
  count: number;
}

const NewsTab = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const categories: Category[] = [
    { id: "all", label: "All Articles", count: 10 },
    { id: "energy", label: "Energy", count: 5 },
    { id: "infrastructure", label: "Infrastructure", count: 3 },
    { id: "mining", label: "Mining", count: 2 },
    { id: "environment", label: "Environment", count: 1 },
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: "Geotechnical Investigations services for Jiji Hp Project",
      category: "energy",
      location: "Matana, Burundi",
      client: "Aecom/Artelia",
      period: "Dec 2024",
      year: "2024",
      image: "/Slope_Stability_2.jpeg",
      excerpt:
        "Comprehensive geotechnical investigation services for hydropower project including drilling operations, geotechnical engineering analysis, and laboratory testing with slope stability assessment.",
      services: [
        "Drilling",
        "Geotechnical Engineering",
        "Laboratory Testing",
        "Slope Stability Analysis",
      ],
      challenges: "Complex geological conditions in hydropower development",
      solution:
        "Advanced drilling techniques and comprehensive slope stability analysis",
      publishDate: "January 15, 2025",
      readTime: "8 min read",
    },
    {
      id: 2,
      title:
        "Geotechnical and Topographical Survey services for Mutambu 1MW HP Project",
      category: "energy",
      location: "Mutambu, Burundi",
      client: "ANZANA ELECTRIC GROUP",
      period: "Jan 2025",
      year: "2025",
      image: "/Lugeon_2.jpeg",
      excerpt:
        "Integrated geotechnical and topographical survey services for 1MW hydropower project including geophysical surveys, drilling operations, and aerial topography surveys.",
      services: [
        "Geophysical Surveys",
        "Drilling",
        "Geotechnical Engineering",
        "Laboratory Testing",
        "Aerial and Topography Surveys",
      ],
      challenges:
        "Multi-disciplinary survey requirements for hydropower development",
      solution:
        "Integrated geophysical and topographical survey approach with advanced aerial mapping",
      publishDate: "January 10, 2025",
      readTime: "10 min read",
    },
    {
      id: 3,
      title:
        "Additional Investigation for Upper Mule037 Project and Construction material",
      category: "energy",
      location: "Matana, Burundi",
      client: "SONGA ENERGY",
      period: "Dec 2023",
      year: "2023",
      image: "/Launch_of_Services_2.jpeg",
      excerpt:
        "Additional geotechnical investigation and construction material analysis for upper hydropower project including drilling, geotechnical engineering, and laboratory testing.",
      services: ["Drilling", "Geotechnical Engineering", "Laboratory Testing"],
      challenges:
        "Construction material sourcing and geotechnical optimization",
      solution:
        "Specialized drilling and comprehensive laboratory testing for material quality assurance",
      publishDate: "February 20, 2024",
      readTime: "7 min read",
    },
    {
      id: 4,
      title:
        "10.3km 2D Electrical Resistivity Survey for the Isingiro water Supply Project",
      category: "infrastructure",
      location: "Isingiro, Uganda",
      client: "RAZEL-BEC",
      period: "Oct 2022",
      year: "2022",
      image: "/Isingiro_Project.jpeg",
      excerpt:
        "Extensive 2D electrical resistivity survey covering 10.3km for water supply infrastructure project including geophysical surveys and geotechnical engineering analysis.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Large-scale water supply infrastructure survey requirements",
      solution:
        "Advanced 2D electrical resistivity techniques covering extensive survey area",
      publishDate: "December 15, 2022",
      readTime: "9 min read",
    },
    {
      id: 5,
      title:
        "2D Electrical Resistivity Survey for a potential Quarry in Kasenene Nakasajja",
      category: "mining",
      location: "Gayaza, Uganda",
      client: "FARMSTONE",
      period: "June 2020",
      year: "2020",
      image: "/Kasenene.jpg",
      excerpt:
        "Geophysical investigation for potential quarry site using 2D electrical resistivity survey techniques and geotechnical engineering analysis.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges:
        "Quarry site feasibility assessment and geological characterization",
      solution:
        "2D electrical resistivity survey for subsurface geological mapping",
      publishDate: "August 10, 2020",
      readTime: "6 min read",
    },
    {
      id: 6,
      title:
        "2D Electrical Resistivity Survey for the Proposed Quarry Site at Zirobwe",
      category: "mining",
      location: "Zirobwe, Uganda",
      client: "ALOLAC GROUP OF COMPANIES LTD",
      period: "Aug 2024",
      year: "2024",
      image: "/Zirobwe.jpg",
      excerpt:
        "Comprehensive geophysical investigation for proposed quarry site using 2D electrical resistivity survey and geotechnical engineering assessment.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Quarry site geological characterization and feasibility",
      solution:
        "Advanced 2D electrical resistivity survey for detailed subsurface analysis",
      publishDate: "September 25, 2024",
      readTime: "7 min read",
    },
    {
      id: 7,
      title:
        "Geological, Geotechnical and Slope Studies for Rwimi II Small Hydropower Project",
      category: "energy",
      location: "Kasese, Uganda",
      client: "RWIMI II ENERGY LIMITED",
      period: "Jan 2023",
      year: "2023",
      image: "https://www.norfund.no/wp-content/uploads/2020/01/2017-10-17-10.15.05-scaled.jpg",
      excerpt:
        "Comprehensive geological, geotechnical and slope stability studies for small hydropower project including geophysical surveys and geotechnical engineering.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Small hydropower development in mountainous terrain",
      solution:
        "Integrated geological and slope stability assessment for safe hydropower development",
      publishDate: "March 18, 2023",
      readTime: "11 min read",
    },
    {
      id: 8,
      title:
        "2D Electrical Resistivity Survey for the proposed swimming pool and Ferry Landing Site at Paraa Safari Lodge",
      category: "infrastructure",
      location: "Murchison Falls Park, Uganda",
      client: "PARAA SAFARI LODGE",
      period: "Oct 2022",
      year: "2022",
      image: "/Paara.jpg",
      excerpt:
        "Specialized geophysical investigation for tourism infrastructure including swimming pool and ferry landing site using 2D electrical resistivity survey.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges:
        "Tourism infrastructure development in protected park environment",
      solution:
        "Environmental-friendly geophysical survey techniques for sensitive ecosystem",
      publishDate: "November 12, 2022",
      readTime: "8 min read",
    },
    {
      id: 9,
      title:
        "2D Electrical Resistivity Survey for the proposed thermal Power Plant in Gayaza Landfill",
      category: "energy",
      location: "Gayaza, Uganda",
      client: "KCCA",
      period: "July 2024",
      year: "2024",
      image: "/Gayaza.jpeg",
      excerpt:
        "Geophysical investigation for thermal power plant development at landfill site using 2D electrical resistivity survey and geotechnical engineering.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges:
        "Power plant development on landfill site with complex subsurface conditions",
      solution:
        "Specialized resistivity survey for landfill characterization and power plant foundation design",
      publishDate: "August 30, 2024",
      readTime: "9 min read",
    },
    {
      id: 10,
      title:
        "Seismic Refraction Services For Design of River Nyamwamba Maintenance and Flood Protection Works",
      category: "environment",
      location: "Kasese, Uganda",
      client: "Ministry of Water and Environment",
      period: "July 2025",
      year: "2025",
      image: "/Nyamwamba.jpeg",
      excerpt:
        "Seismic refraction services for river maintenance and flood protection infrastructure design including geophysical surveys and geotechnical engineering.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Flood protection infrastructure design in river environment",
      solution:
        "Seismic refraction techniques for subsurface characterization and flood protection design",
      publishDate: "January 5, 2025",
      readTime: "12 min read",
    },
  ];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes("unsplash.com")) {
      target.src =
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80";
    }
  };

  const handleImageErrorCompact = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes("unsplash.com")) {
      target.src =
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80";
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesFilter =
      activeFilter === "all" || article.category === activeFilter;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "energy":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "infrastructure":
        return "bg-green-100 text-green-800 border-green-200";
      case "mining":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "environment":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "energy":
        return <Target className="h-3 w-3" />;
      case "infrastructure":
        return <TrendingUp className="h-3 w-3" />;
      case "mining":
        return <Award className="h-3 w-3" />;
      case "environment":
        return <Lightbulb className="h-3 w-3" />;
      default:
        return <Tag className="h-3 w-3" />;
    }
  };

  if (selectedArticle) {
    const article = articles.find((a) => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="space-y-8">
        <Button
          variant="outline"
          onClick={() => setSelectedArticle(null)}
          className="mb-6 border-[#4DA34D] text-[#345363] hover:bg-[#9EDB9E]/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>

        <section className="text-center space-y-6">
          <div className="space-y-4">
            <Badge className={getCategoryColor(article.category)}>
              {getCategoryIcon(article.category)}
              <span className="ml-1 capitalize">{article.category}</span>
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#345363]">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-stone-600">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {article.publishDate}
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                {article.readTime}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {article.location}
              </span>
            </div>
          </div>
        </section>

        <section>
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-8">
          <Card className="border-[#9EDB9E]/50">
            <CardHeader>
              <CardTitle className="text-2xl text-[#345363]">
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#345363] mb-2">Client</h4>
                  <p className="text-stone-600">{article.client}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Project Period
                  </h4>
                  <p className="text-stone-600">{article.period}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Location
                  </h4>
                  <p className="text-stone-600">{article.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#345363] mb-2">Year</h4>
                  <p className="text-stone-600">{article.year}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#345363] mb-3">
                  Services Provided
                </h4>
                <div className="flex flex-wrap gap-2">
                  {article.services.map((service) => (
                    <Badge
                      key={`service-${article.id}-${service}`}
                      variant="outline"
                      className="border-[#4DA34D] text-[#345363]"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#345363] mb-2">
                  Project Description
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Challenges
                  </h4>
                  <p className="text-stone-600">{article.challenges}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Solution
                  </h4>
                  <p className="text-stone-600">{article.solution}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-[#345363] to-[#4DA34D] text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Need Similar Services?
              </h3>
              <p className="text-[#9EDB9E]/80 mb-6">
                Contact our team to discuss how we can provide similar solutions
                for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#9EDB9E] hover:bg-white text-[#345363]"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Get Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#9EDB9E] text-[#9EDB9E] hover:bg-[#9EDB9E] hover:text-[#345363]"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="text-center animate-in slide-in-from-bottom-4 duration-1000">
        <Badge
          variant="secondary"
          className="bg-[#9EDB9E] text-[#345363] border-[#4DA34D] mb-4 animate-pulse"
        >
          Case Studies & Insights
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#345363] mb-6 animate-in slide-in-from-left-6 duration-1000 delay-200">
          Project Case Studies
        </h1>
        <p className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed animate-in slide-in-from-right-6 duration-1000 delay-300">
          Explore our portfolio of successful geoscience projects across
          Sub-Saharan Africa. Each case study demonstrates our expertise,
          innovative solutions, and commitment to building Eastern Africa's
          largest geoscientific database.
        </p>
      </section>

      <section className="animate-in slide-in-from-bottom-6 duration-1000 delay-400">
        <Card className="border-[#9EDB9E]/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search case studies, locations, or clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      activeFilter === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveFilter(category.id)}
                    className={`${
                      activeFilter === category.id
                        ? "bg-[#4DA34D] hover:bg-[#345363] text-white"
                        : "border-[#9EDB9E] text-[#345363] hover:bg-[#9EDB9E]/20"
                    }`}
                  >
                    <Filter className="mr-1 h-3 w-3" />
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <Card
              key={`article-${article.id}`}
              className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-[#9EDB9E]/50 overflow-hidden animate-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={handleImageErrorCompact}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(article.category)}>
                    {getCategoryIcon(article.category)}
                    <span className="ml-1 capitalize">{article.category}</span>
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between text-sm text-stone-500 mb-2">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {article.publishDate}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </span>
                </div>
                <CardTitle className="text-lg mb-2 text-[#345363] group-hover:text-[#4DA34D] transition-colors duration-300 line-clamp-2">
                  {article.title}
                </CardTitle>
                <div className="flex items-center text-sm text-stone-600 mb-3">
                  <MapPin className="mr-1 h-3 w-3" />
                  {article.location} • {article.client}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-stone-600 line-clamp-3">
                  {article.excerpt}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.services.slice(0, 2).map((service) => (
                    <Badge
                      key={`${article.id}-service-${service}`}
                      variant="outline"
                      className="text-xs border-[#4DA34D] text-[#345363]"
                    >
                      {service}
                    </Badge>
                  ))}
                  {article.services.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-stone-300 text-stone-500"
                    >
                      +{article.services.length - 2} more
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  className="w-full bg-[#4DA34D] hover:bg-[#345363] text-white group-btn hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedArticle(article.id)}
                >
                  Read Full Case Study
                  <ArrowRight className="ml-2 h-3 w-3 group-btn-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-600">
        <Card className="bg-gradient-to-r from-[#345363] to-[#4DA34D] text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Start Your Success Story
            </h3>
            <p className="text-[#9EDB9E]/80 mb-6 max-w-2xl mx-auto text-lg">
              Ready to create your own case study? Contact our team to discuss
              how we can deliver similar results for your geoscience project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#9EDB9E] hover:bg-white text-[#345363] hover:text-[#345363]"
              >
                <Phone className="mr-2 h-4 w-4" />
                Discuss Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#9EDB9E] text-[#9EDB9E] hover:bg-[#9EDB9E] hover:text-[#345363]"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View All Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <NewsletterSignup
            variant="compact"
            title="Stay Updated with Latest Research"
            description="Get exclusive access to our latest geoscience insights, project updates, and research findings."
            className="max-w-md mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default NewsTab;
