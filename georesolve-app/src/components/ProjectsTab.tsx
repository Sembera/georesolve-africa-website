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
  Building,
  Calendar,
  ExternalLink,
  Eye,
  Factory,
  Filter,
  MapPin,
  Mountain,
  Search,
  Zap,
} from "lucide-react";
import { useState } from "react";

const ProjectsTab = ({
  onNavigateToNews,
  onNavigateToContact,
}: {
  onNavigateToNews?: (projectId: number) => void;
  onNavigateToContact: () => void;
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const industries = [
    { id: "all", label: "All Projects", count: 10 },
    { id: "energy", label: "Energy", count: 5 },
    { id: "infrastructure", label: "Infrastructure", count: 3 },
    { id: "mining", label: "Mining", count: 2 },
    { id: "environment", label: "Environment", count: 1 },
  ];

  const projects = [
    {
      id: 1,
      title:
        "Slope stability assessment & analysis services for Jiji Hp Project",
      category: "energy",
      location: "Matana, Burundi",
      coordinates: { lat: -3.3833, lng: 29.7167 },
      client: "Aecom/Artelia",
      period: "Dec 2024",
      status: "In Progress",
      year: "2024",
      image: "/Slope_Stability_2.jpeg",
      description:
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
    },
    {
      id: 2,
      title:
        "Geotechnical and Topographical Survey services for Mutambu 1MW HP Project",
      category: "energy",
      location: "Mutambu, Burundi",
      coordinates: { lat: -3.4, lng: 29.75 },
      client: "ANZANA ELECTRIC GROUP",
      period: "Jan 2025",
      status: "In Progress",
      year: "2025",
      image: "/Lugeon_2.jpeg",
      description:
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
    },
    {
      id: 3,
      title:
        "Additional Investigation for Upper Mule037 Project and Construction material",
      category: "energy",
      location: "Matana, Burundi",
      coordinates: { lat: -3.3833, lng: 29.7167 },
      client: "SONGA ENERGY",
      period: "Dec 2023",
      status: "Completed",
      year: "2023",
      image: "/Launch_of_Services_2.jpeg",
      description:
        "Additional geotechnical investigation and construction material analysis for upper hydropower project including drilling, geotechnical engineering, and laboratory testing.",
      services: ["Drilling", "Geotechnical Engineering", "Laboratory Testing"],
      challenges:
        "Construction material sourcing and geotechnical optimization",
      solution:
        "Specialized drilling and comprehensive laboratory testing for material quality assurance",
    },
    {
      id: 4,
      title:
        "10.3km 2D Electrical Resistivity Survey for the Isingiro water Supply Project",
      category: "infrastructure",
      location: "Isingiro, Uganda",
      coordinates: { lat: -0.8167, lng: 30.8333 },
      client: "RAZEL-BEC",
      period: "Oct 2022",
      status: "Completed",
      year: "2022",
      image: "/Isingiro_Project.jpeg",
      description:
        "Extensive 2D electrical resistivity survey covering 10.3km for water supply infrastructure project including geophysical surveys and geotechnical engineering analysis.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Large-scale water supply infrastructure survey requirements",
      solution:
        "Advanced 2D electrical resistivity techniques covering extensive survey area",
    },
    {
      id: 5,
      title:
        "2D Electrical Resistivity Survey for a potential Quarry in Kasenene Nakasajja",
      category: "mining",
      location: "Gayaza, Uganda",
      coordinates: { lat: 0.4167, lng: 32.6167 },
      client: "FARMSTONE",
      period: "June 2020",
      status: "Completed",
      year: "2020",
      image: "/Kasenene.jpg",
      description:
        "Geophysical investigation for potential quarry site using 2D electrical resistivity survey techniques and geotechnical engineering analysis.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges:
        "Quarry site feasibility assessment and geological characterization",
      solution:
        "2D electrical resistivity survey for subsurface geological mapping",
    },
    {
      id: 6,
      title:
        "2D Electrical Resistivity Survey for the Proposed Quarry Site at Zirobwe",
      category: "mining",
      location: "Zirobwe, Uganda",
      coordinates: { lat: 0.45, lng: 32.9167 },
      client: "ALOLAC GROUP OF COMPANIES LTD",
      period: "Aug 2024",
      status: "Completed",
      year: "2024",
      image: "/Zirobwe.jpg",
      description:
        "Comprehensive geophysical investigation for proposed quarry site using 2D electrical resistivity survey and geotechnical engineering assessment.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Quarry site geological characterization and feasibility",
      solution:
        "Advanced 2D electrical resistivity survey for detailed subsurface analysis",
    },
    {
      id: 7,
      title:
        "Geological, Geotechnical and Slope Studies for Rwimi II Small Hydropower Project",
      category: "energy",
      location: "Kasese, Uganda",
      coordinates: { lat: 0.1833, lng: 30.0833 },
      client: "RWIMI II ENERGY LIMITED",
      period: "Jan 2023",
      status: "Completed",
      year: "2023",
      image: "https://ext.same-assets.com/1481306800/3690609158.jpeg",
      description:
        "Comprehensive geological, geotechnical and slope stability studies for small hydropower project including geophysical surveys and geotechnical engineering.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Small hydropower development in mountainous terrain",
      solution:
        "Integrated geological and slope stability assessment for safe hydropower development",
    },
    {
      id: 8,
      title:
        "2D Electrical Resistivity Survey for the proposed swimming pool and Ferry Landing Site at Paraa Safari Lodge",
      category: "infrastructure",
      location: "Murchison Falls Park, Uganda",
      coordinates: { lat: 2.2833, lng: 31.5167 },
      client: "PARAA SAFARI LODGE",
      period: "Oct 2022",
      status: "Completed",
      year: "2022",
      image: "/Paara.jpg",
      description:
        "Specialized geophysical investigation for tourism infrastructure including swimming pool and ferry landing site using 2D electrical resistivity survey.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges:
        "Tourism infrastructure development in protected park environment",
      solution:
        "Environmental-friendly geophysical survey techniques for sensitive ecosystem",
    },
    {
      id: 9,
      title:
        "2D Electrical Resistivity Survey for the proposed thermal Power Plant in Gayaza Landfill",
      category: "energy",
      location: "Gayaza, Uganda",
      coordinates: { lat: 0.4167, lng: 32.6167 },
      client: "KCCA",
      period: "July 2024",
      status: "Completed",
      year: "2024",
      image: "/Gayaza.jpeg",
      description:
        "Geophysical investigation for thermal power plant development at landfill site using 2D electrical resistivity survey and geotechnical engineering.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges:
        "Power plant development on landfill site with complex subsurface conditions",
      solution:
        "Specialized resistivity survey for landfill characterization and power plant foundation design",
    },
    {
      id: 10,
      title:
        "Seismic Refraction Services For Design of River Nyamwamba Maintenance and Flood Protection Works",
      category: "environment",
      location: "Kasese, Uganda",
      coordinates: { lat: 0.1833, lng: 30.0833 },
      client: "Ministry of Water and Environment",
      period: "July 2025",
      status: "Planning",
      year: "2025",
      image: "/Nyamwamba.jpeg",
      description:
        "Seismic refraction services for river maintenance and flood protection infrastructure design including geophysical surveys and geotechnical engineering.",
      services: ["Geophysical Surveys", "Geotechnical Engineering"],
      challenges: "Flood protection infrastructure design in river environment",
      solution:
        "Seismic refraction techniques for subsurface characterization and flood protection design",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === "all" || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIndustryIcon = (category: string) => {
    switch (category) {
      case "infrastructure":
        return Building;
      case "energy":
        return Zap;
      case "mining":
        return Mountain;
      case "environment":
        return Factory;
      default:
        return Building;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planning":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Design Phase":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center">
        <Badge
          variant="secondary"
          className="bg-[#9EDB9E] text-[#345363] border-[#4DA34D] mb-4"
        >
          Our Projects
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#345363] mb-6">
          Case Studies & Success Stories
        </h1>
        <p className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed">
          Explore our portfolio of successful geoscience projects across
          Africa's Great Lakes region, demonstrating our expertise in energy,
          infrastructure, mining, and environmental projects while building the
          largest geoscientific database in Eastern Africa.
        </p>
      </section>

      {/* Filters and Search */}
      <section>
        <Card className="border-[#9EDB9E]/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  placeholder="Search projects, locations, or clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Industry Filters */}
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Button
                    key={industry.id}
                    variant={
                      activeFilter === industry.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveFilter(industry.id)}
                    className={`${
                      activeFilter === industry.id
                        ? "bg-[#4DA34D] hover:bg-[#345363] text-white"
                        : "border-[#9EDB9E] text-[#345363] hover:bg-[#9EDB9E]/20"
                    }`}
                  >
                    <Filter className="mr-1 h-3 w-3" />
                    {industry.label} ({industry.count})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const Icon = getIndustryIcon(project.category);
            return (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow duration-300 border-[#9EDB9E]/50 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Icon className="h-4 w-4 text-[#4DA34D]" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 text-[#345363]">
                        {project.title}
                      </CardTitle>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-stone-600">
                          <MapPin className="mr-1 h-3 w-3" />
                          {project.location}
                        </div>
                        <div className="flex items-center text-sm text-stone-600">
                          <Calendar className="mr-1 h-3 w-3" />
                          {project.year} • {project.period}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-stone-600">
                    {project.description}
                  </CardDescription>

                  <div>
                    <p className="text-sm font-medium text-[#345363] mb-2">
                      Services Provided:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.services.map((service, index) => (
                        <Badge
                          key={`service-${index}`}
                          variant="outline"
                          className="text-xs border-[#4DA34D] text-[#345363]"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-[#4DA34D] text-[#345363] hover:bg-[#9EDB9E]/20"
                      onClick={() => onNavigateToNews?.(project.id)}
                    >
                      <Eye className="mr-2 h-3 w-3" />
                      Read More
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Map View Section */}
      <section>
        <Card className="border-[#9EDB9E]/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[#345363]">
              <MapPin className="h-5 w-5 text-[#4DA34D]" />
              <span>Project Locations</span>
            </CardTitle>
            <CardDescription>
              Interactive map showing our project locations across Africa's
              Great Lakes region - Uganda and Burundi
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for map integration */}
            <div className="w-full h-96 bg-[#9EDB9E]/10 rounded-lg flex items-center justify-center border-2 border-dashed border-[#9EDB9E]">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#4DA34D] mx-auto mb-4" />
                <p className="text-[#345363] mb-2">
                  Interactive Map Coming Soon
                </p>
                <p className="text-sm text-stone-500">
                  This will show project locations with detailed information on
                  hover
                </p>
                <Button className="mt-4 bg-[#4DA34D] hover:bg-[#345363] text-white">
                  View Full Map
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Project Statistics */}
      <section>
        <Card className="bg-[#345363] text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">
                  50+
                </div>
                <div className="text-[#9EDB9E]/80">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">7+</div>
                <div className="text-[#9EDB9E]/80">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">4</div>
                <div className="text-[#9EDB9E]/80">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">#1</div>
                <div className="text-[#9EDB9E]/80">Regional Database</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section>
        <Card className="bg-gradient-to-r from-[#FAF9F6] to-[#9EDB9E]/20 border-[#9EDB9E]/50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-[#345363] mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Let us help you achieve similar success with our comprehensive
              geoscience solutions tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#4DA34D] hover:bg-[#345363] text-white"
                onClick={onNavigateToContact}
              >
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#345363] text-[#345363] hover:bg-[#9EDB9E]/20"
                onClick={onNavigateToContact}
              >
                Request Project Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ProjectsTab;
