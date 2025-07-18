import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  FlaskConical,
  Gauge,
  Globe,
  Hammer,
  Image,
  Mail,
  Phone,
  Settings,
  Shield,
  Upload,
} from "lucide-react";

const ServicesTab = ({
  onNavigateToNews,
  onNavigateToContact,
}: {
  onNavigateToNews: () => void;
  onNavigateToContact: () => void;
}) => {
  const services = [
    {
      id: "geo-engineering",
      title: "Geo-Engineering Services",
      icon: Hammer,
      description:
        "Data-driven site investigations and geophysical solutions to support safe, sustainable, and cost-effective development across Sub-Saharan Africa.",
      highlights: [
        "Drilling, SPT, double/triple tube coring",
        "In-situ tests (vane shear, Lugeon, packer)",
        "Seismic refraction, resistivity, MASW, GPR",
        "Foundation design and remediation",
        "Slope stability & geohazard studies",
        "Environmental geotechnical investigations",
      ],
      tools: [
        "Borehole drilling rigs",
        "Dynamic Cone Penetrometer (DCP)",
        "Vane shear testing tools",
        "Packer test equipment",
        "Geophysical seismic equipment (refraction, downhole, cross-hole)",
        "GPR units",
        "Resistivity meters",
      ],
      deliverables: [
        "Geotechnical reports",
        "Borehole logs",
        "Foundation recommendations",
        "Risk and mitigation plans",
      ],
      heroPlaceholder: "Geo-Engineering Field Work",
    },
    {
      id: "geo-spatial",
      title: "Geo-Spatial Services",
      icon: Globe,
      description:
        "High-precision mapping and geospatial intelligence for infrastructure, environmental, and planning projects using cutting-edge technology.",
      highlights: [
        "Drone-based photogrammetry",
        "Lidar 3D scanning",
        "Topographic and cadastral surveys",
        "GIS data acquisition and analysis",
        "Hydrographic surveys (ROV, ADCP, bathymetry)",
      ],
      tools: [
        "RTK GNSS receivers",
        "UAV drones with photogrammetry payloads",
        "Lidar scanners",
        "Total stations",
        "Acoustic Doppler profilers (ADCP)",
        "Remote operated vehicles (ROV)",
      ],
      deliverables: [
        "Orthomosaics",
        "Digital terrain and surface models",
        "GIS shapefiles",
        "3D site models",
      ],
      heroPlaceholder: "Drone Survey Operations",
    },
    {
      id: "laboratory-testing",
      title: "Laboratory Testing",
      icon: FlaskConical,
      description:
        "Accredited laboratory services to ensure materials and geotechnical samples meet project specifications and international standards.",
      highlights: [
        "Soil, rock, and aggregate testing",
        "Concrete and construction materials testing",
        "Custom research and development",
        "Quality control for infrastructure projects",
      ],
      tools: [
        "Triaxial testing apparatus",
        "Direct shear testing machines",
        "Permeability testing equipment",
        "Consolidation test systems",
        "SPT sampling sets",
        "CPT systems",
        "Geotechnical monitoring instruments",
      ],
      deliverables: [
        "Accredited lab certificates",
        "Compliance reports",
        "Materials test reports",
      ],
      heroPlaceholder: "Laboratory Testing Equipment",
    },
    {
      id: "ndt-testing",
      title: "Non-Destructive Testing (NDT)",
      icon: Shield,
      description:
        "Reliable, cost-effective testing to guarantee the safety and performance of structures without damage or destruction.",
      highlights: [
        "Ultrasonic testing",
        "Radiographic inspection",
        "Magnetic particle testing",
        "Structural health monitoring",
      ],
      tools: [
        "Ultrasonic flaw detectors",
        "Radiographic X-ray equipment",
        "Magnetic particle testing kits",
        "Sensors for vibration and strain monitoring",
      ],
      deliverables: ["NDT inspection reports", "Compliance certificates"],
      heroPlaceholder: "NDT Equipment in Action",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Header Section */}
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#FAF9F6] to-[#9EDB9E]/10 animate-in slide-in-from-bottom-4 duration-1000">
        <div className="container mx-auto px-4 text-center">
          <Badge
            variant="secondary"
            className="bg-[#9EDB9E] text-[#345363] border-[#4DA34D] mb-6 animate-pulse text-lg px-6 py-2"
          >
            Our Services
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#345363] mb-8 animate-in slide-in-from-left-6 duration-1000 delay-200">
            Comprehensive Geoscience Solutions
          </h1>
          <div className="max-w-5xl mx-auto animate-in slide-in-from-right-6 duration-1000 delay-300">
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              At GeoResolve Africa, our comprehensive suite of geoscience
              services combines cutting-edge technology with deep regional
              expertise to deliver reliable, data-driven solutions. From initial
              site investigations to advanced monitoring, we support every phase
              of your project with precision and innovation.
            </p>
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 shadow-lg">
              <p className="text-lg text-slate-700 leading-relaxed">
                Our integrated approach ensures that every service contributes
                to building Eastern Africa's largest geoscientific database,
                providing you with insights that go beyond individual project
                requirements to support regional development goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections - Vertical Stack */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;

        return (
          <section
            key={service.id}
            className={`min-h-screen flex items-center py-20 ${
              isEven
                ? "bg-white"
                : "bg-gradient-to-br from-[#FAF9F6] to-[#9EDB9E]/5"
            } animate-in slide-in-from-bottom-6 duration-1000`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="container mx-auto px-4">
              <Card className="max-w-7xl mx-auto border-[#9EDB9E]/30 shadow-2xl hover:shadow-3xl transition-all duration-700 rounded-3xl overflow-hidden group">
                {/* Hero Image Section */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={
                      service.heroPlaceholder === "Geo-Engineering Field Work"
                        ? "/Cross_Section.jpg"
                        : service.heroPlaceholder === "Drone Survey Operations"
                          ? "/Aerial_.jpg"
                          : service.heroPlaceholder ===
                              "Laboratory Testing Equipment"
                            ? "/Laboratory_3.jpg"
                            : service.heroPlaceholder ===
                                "NDT Equipment in Action"
                              ? "/NDT.png"
                              : ""
                    }
                    alt={`${service.title} - ${service.heroPlaceholder} showing professional geoscience work`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 z-10">
                    <Badge className="bg-orange-500 text-white font-semibold text-lg px-4 py-2">
                      {service.title}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Title and Description */}
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="p-4 bg-[#4DA34D]/10 rounded-2xl group-hover:bg-[#4DA34D] group-hover:scale-110 transition-all duration-500">
                            <Icon className="h-10 w-10 text-[#4DA34D] group-hover:text-white transition-colors duration-500" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-[#345363] group-hover:text-[#4DA34D] transition-colors duration-300">
                              {service.title}
                            </h2>
                          </div>
                        </div>
                        <p className="text-xl text-stone-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Learn More Button */}
                      <div>
                        <Button
                          size="lg"
                          className="bg-[#4DA34D] hover:bg-[#345363] text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group-btn"
                        >
                          Learn More About {service.title}
                          <ArrowRight className="ml-3 h-5 w-5 group-btn-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>

                    {/* Right Column - Service Details */}
                    <div className="space-y-10">
                      {/* Key Highlights */}
                      <div className="bg-gradient-to-br from-[#9EDB9E]/10 to-[#4DA34D]/5 p-8 rounded-2xl border border-[#9EDB9E]/30">
                        <h4 className="text-xl font-bold text-[#345363] mb-6 flex items-center">
                          <Settings className="h-6 w-6 mr-3 text-[#4DA34D]" />
                          Key Highlights
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {service.highlights.map((highlight, idx) => (
                            <div
                              key={`${service.id}-highlight-${idx}`}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-300"
                            >
                              <CheckCircle className="h-5 w-5 text-[#4DA34D] mt-0.5 flex-shrink-0" />
                              <span className="text-stone-600 font-medium">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tools & Technology */}
                      <div className="bg-gradient-to-br from-blue-50 to-[#345363]/5 p-8 rounded-2xl border border-blue-200/50">
                        <h4 className="text-xl font-bold text-[#345363] mb-6 flex items-center">
                          <Gauge className="h-6 w-6 mr-3 text-[#4DA34D]" />
                          Tools & Technology
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {service.tools.map((tool, idx) => (
                            <div
                              key={`${service.id}-tool-${idx}`}
                              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-300"
                            >
                              <div className="h-3 w-3 bg-[#4DA34D] rounded-full mt-2 flex-shrink-0" />
                              <span className="text-stone-600">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div className="bg-gradient-to-br from-emerald-50 to-[#4DA34D]/10 p-8 rounded-2xl border border-emerald-200/50">
                        <h4 className="text-xl font-bold text-[#345363] mb-6 flex items-center">
                          <CheckCircle className="h-6 w-6 mr-3 text-[#4DA34D]" />
                          Deliverables
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {service.deliverables.map((deliverable, idx) => (
                            <Badge
                              key={`${service.id}-deliverable-${idx}`}
                              variant="outline"
                              className="border-[#4DA34D] text-[#345363] hover:bg-[#4DA34D] hover:text-white transition-all duration-300 text-sm px-4 py-2 rounded-xl cursor-pointer"
                            >
                              {deliverable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        );
      })}

      {/* Why Choose Our Services */}
      <section className="min-h-[60vh] flex items-center bg-gradient-to-r from-[#345363] to-[#4DA34D] text-white animate-in slide-in-from-bottom-8 duration-1000 delay-600">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Why Choose GeoResolve Africa?
            </h2>
            <p className="text-[#9EDB9E]/90 text-xl max-w-4xl mx-auto leading-relaxed">
              Our integrated approach combines regional expertise with global
              standards to deliver unmatched geoscience solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Quality Assurance",
                description:
                  "Accredited processes and international standards compliance",
              },
              {
                icon: Settings,
                title: "Advanced Technology",
                description:
                  "Cutting-edge equipment and innovative methodologies",
              },
              {
                icon: Globe,
                title: "Regional Expertise",
                description:
                  "Deep understanding of Sub-Saharan Africa's geological conditions",
              },
              {
                icon: FlaskConical,
                title: "Research-Driven",
                description:
                  "Contributing to Eastern Africa's largest geoscientific database",
                onClick: onNavigateToNews,
              },
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-500 animate-in zoom-in duration-500 text-center p-8 rounded-2xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="mx-auto mb-6 p-6 bg-white/10 rounded-2xl w-fit hover:bg-white/20 hover:scale-110 transition-all duration-300">
                      <FeatureIcon className="h-12 w-12 text-[#9EDB9E]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-[#9EDB9E]/80">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get in Touch CTA */}
      <section className="min-h-[50vh] flex items-center bg-[#FAF9F6] animate-in zoom-in duration-1000 delay-800">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-5xl mx-auto bg-white border-[#9EDB9E]/50 shadow-2xl rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9EDB9E]/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <CardContent className="p-16 text-center relative z-10">
              <h3 className="text-3xl font-bold text-[#345363] mb-8">
                Get in Touch
              </h3>
              <p className="text-stone-600 mb-12 max-w-3xl mx-auto text-xl leading-relaxed">
                Ready to start your next geoscience project? Contact our expert
                team to discuss your requirements and discover how we can
                support your goals with precision, innovation, and deep regional
                expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-[#4DA34D] hover:bg-[#345363] text-white px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl group-btn"
                  onClick={onNavigateToContact}
                >
                  <Phone className="mr-3 h-6 w-6 group-btn-hover:animate-pulse" />
                  Request a Quote
                  <ChevronRight className="ml-3 h-6 w-6 group-btn-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#345363] text-[#345363] hover:bg-[#9EDB9E]/20 px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 group-btn"
                  onClick={onNavigateToContact}
                >
                  <Mail className="mr-3 h-6 w-6 group-btn-hover:animate-bounce" />
                  Contact Us
                </Button>
              </div>

              <div className="mt-12 pt-8 border-t border-[#9EDB9E]/30">
                <p className="text-stone-500 mb-4">
                  Trusted by leading organizations across Sub-Saharan Africa
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 text-sm">
                  <span className="text-stone-400">50+ Projects Delivered</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-400">7+ Years Experience</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-400">4 Countries Served</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-400">#1 Regional Database</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ServicesTab;
