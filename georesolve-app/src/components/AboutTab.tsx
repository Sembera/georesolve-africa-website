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
  Award,
  Building,
  Calendar,
  CheckCircle,
  Database,
  Eye,
  FlaskConical,
  Globe,
  Hammer,
  Heart,
  Image,
  Lightbulb,
  MapPin,
  Shield,
  Target,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from "lucide-react";

const AboutTab = ({
  onNavigateToServices,
  onNavigateToNews,
  onNavigateToContact,
}: {
  onNavigateToServices: () => void;
  onNavigateToNews: () => void;
  onNavigateToContact: () => void;
}) => {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Doing the right thing, every time",
    },
    {
      icon: Award,
      title: "Technical Excellence",
      description: "Pursuing accuracy and innovation",
    },
    {
      icon: TrendingUp,
      title: "Sustainability",
      description: "Supporting safe, long-term development",
    },
    {
      icon: Heart,
      title: "Humanity",
      description:
        "Collaborating with communities and nurturing the next generation of scientists",
    },
  ];

  const capabilities = [
    {
      icon: Hammer,
      title: "Advanced geo-engineering investigations",
      description:
        "Comprehensive geotechnical investigations and engineering analysis",
    },
    {
      icon: Globe,
      title: "High-accuracy geo-spatial mapping and aerial surveys",
      description:
        "Precision mapping using cutting-edge technology and techniques",
    },
    {
      icon: FlaskConical,
      title: "Accredited laboratory testing",
      description: "Testing of soils, concrete, and construction materials",
    },
    {
      icon: Users,
      title: "Local workforce and logistics management",
      description: "Large-scale data acquisition with local expertise",
    },
  ];

  const teamRoles = [
    "Geotechnical engineers",
    "Geophysicists",
    "GIS and remote sensing specialists",
    "Laboratory technicians",
    "Field operations experts",
  ];

  const milestones = [
    {
      year: "2018",
      title: "Conception",
      description:
        "The vision for GeoResolve Africa was born from recognizing the need for quality geoscience services in the region",
      icon: Lightbulb,
      hasPhoto: true,
    },
    {
      year: "2020",
      title: "Official Launch of Services",
      description:
        "Began operations with specialized geophysical and aerial surveys across Sub-Saharan Africa",
      icon: Zap,
      hasPhoto: true,
    },
    {
      year: "2022",
      title: "First International Project in Burundi",
      description:
        "Expanded operations across borders, delivering high-quality geoscience solutions regionally",
      icon: Globe,
      hasPhoto: true,
    },
    {
      year: "2024",
      title: "Launched Research Department",
      description:
        "Established research department sponsoring candidates in quantum sensing, advancing scientific innovation",
      icon: Database,
      hasPhoto: true,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section with Fade-in Animation */}
      <section className="text-center animate-in slide-in-from-bottom-4 duration-1000">
        <Badge
          variant="secondary"
          className="bg-[#9EDB9E] text-[#345363] border-[#4DA34D] mb-4 animate-pulse"
        >
          About GeoResolve Africa
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#345363] mb-6 animate-in slide-in-from-left-6 duration-1000 delay-200">
          Specialized Geo-Data Solutions
        </h1>
        <p className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed mb-8 animate-in slide-in-from-right-6 duration-1000 delay-300">
          At GeoResolve Africa, we specialize in collecting and processing
          geo-data to address and solve real-world challenges. Our expert team
          draws from a range of data sources to deliver insights that guide
          informed decision-making across multiple industries.{" "}
          <button
            onClick={onNavigateToServices}
            className="text-[#4DA34D] hover:text-[#345363] font-semibold underline underline-offset-2 hover:no-underline transition-all duration-200"
          >
            Explore our comprehensive services
          </button>
          .
        </p>
        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200 max-w-4xl mx-auto animate-in zoom-in-95 duration-1000 delay-500 hover:shadow-lg transition-shadow">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Our{" "}
            <button
              onClick={onNavigateToNews}
              className="text-[#4DA34D] hover:text-[#345363] font-semibold underline underline-offset-2 hover:no-underline transition-all duration-200"
            >
              research-driven
            </button>{" "}
            business model is designed to build the largest geoscientific
            database in Eastern Africa. By entrusting your projects to us, you
            directly contribute to developing the geoscientific knowledge base
            of tomorrow. We believe reliable geo-data is the foundation for
            sustainable growth.
          </p>
          <Badge className="bg-emerald-500 text-white text-base px-6 py-2 animate-bounce">
            Building Eastern Africa's Largest Geoscientific Database
          </Badge>
        </div>
      </section>

      {/* Mission Section with Slide Animation */}
      <section className="animate-in slide-in-from-bottom-6 duration-1000 delay-300">
        <Card className="border-[#9EDB9E]/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-[#9EDB9E]/20 rounded-full w-fit group-hover:bg-[#4DA34D] group-hover:scale-110 transition-all duration-500">
              <Target className="h-8 w-8 text-[#4DA34D] group-hover:text-white transition-colors duration-500" />
            </div>
            <CardTitle className="text-2xl text-[#345363] group-hover:text-[#4DA34D] transition-colors duration-300">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-stone-600 text-lg leading-relaxed">
              Empowering decision-makers with precise, dependable geo-data to
              build a stronger, more resilient Africa.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Values Section with Staggered Animation */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-400">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#345363] mb-4 animate-in fade-in duration-1000">
            Our Values
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto animate-in fade-in duration-1000 delay-200">
            The principles that guide our work and define our commitment to
            excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.title}
                className="hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border-[#9EDB9E]/50 text-center group animate-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-[#9EDB9E]/20 rounded-full w-fit group-hover:bg-[#4DA34D] group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <Icon className="h-8 w-8 text-[#4DA34D] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <CardTitle className="text-xl text-[#345363] group-hover:text-[#4DA34D] transition-colors duration-300">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-stone-600 text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Our Story Section with Parallax Effect */}
      <section className="animate-in slide-in-from-left-8 duration-1000 delay-500">
        <Card className="bg-gradient-to-r from-[#FAF9F6] to-[#9EDB9E]/20 border-[#9EDB9E]/50 overflow-hidden relative group hover:shadow-2xl transition-shadow duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          <CardContent className="p-8 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#345363] mb-4 animate-in zoom-in duration-700">
                Our Story
              </h2>
            </div>

            <div className="space-y-6 text-lg text-stone-600 leading-relaxed max-w-4xl mx-auto">
              <p className="animate-in slide-in-from-left-4 duration-700 delay-200">
                Our founders recognized early on the challenges of poor-quality
                services within the regional sector. They set out to create a
                company focused on quality, timely delivery, and affordable
                pricing — driven by the belief that Africa has the right to
                information that supports sound decisions.
              </p>

              <p className="animate-in slide-in-from-right-4 duration-700 delay-400">
                As East Africa's construction industry grows, everyone deserves
                access to world-class geotechnical services. To achieve this, we
                built a research-based model, creating the largest geoscientific
                database in the region so that the future cost of high-quality
                geo-data can become more affordable.
              </p>

              <p className="animate-in slide-in-from-left-4 duration-700 delay-600">
                We began with specialized geophysical and aerial surveys and
                have since expanded to offer a full suite of integrated
                services.
              </p>

              <div className="text-center mt-8 animate-in zoom-in duration-700 delay-800">
                <Badge className="bg-[#4DA34D] text-white text-base px-6 py-2 hover:scale-110 transition-transform duration-300">
                  Established to meet Sub-Saharan Africa's demand for trusted,
                  high-quality geotechnical and geoscience services
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Our Capabilities Section with Hover Effects */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-600">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#345363] mb-4 animate-in fade-in duration-700">
            Our Capabilities
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto animate-in fade-in duration-700 delay-200">
            Comprehensive services supporting infrastructure, mining, energy,
            and environmental sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card
                key={capability.title}
                className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-[#9EDB9E]/50 group animate-in slide-in-from-left-6 duration-700"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[#9EDB9E]/20 rounded-full group-hover:bg-[#4DA34D] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="h-6 w-6 text-[#4DA34D] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#345363] mb-2 group-hover:text-[#4DA34D] transition-colors duration-300">
                        {capability.title}
                      </h3>
                      <p className="text-stone-600">{capability.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Team Section with Photo Placeholder */}
      <section className="animate-in slide-in-from-right-8 duration-1000 delay-700">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#345363] mb-4 flex items-center justify-center animate-in zoom-in duration-700">
            <Users className="mr-3 h-8 w-8 text-[#4DA34D] animate-pulse" />
            Meet the Team
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8 animate-in fade-in duration-700 delay-200">
            Our multidisciplinary team includes:
          </p>
        </div>

        {/* Team Group Photo */}
        <div className="mb-12 animate-in zoom-in duration-1000 delay-300">
          <Card className="border-[#9EDB9E]/50 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
            <CardContent className="p-0">
              <div className="relative overflow-hidden group">
                <img
                  src="/Tool_Box_Meeting.JPG"
                  alt="GeoResolve Africa team members collaborating in the field"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#345363]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-lg font-semibold mb-1">
                    Our Expert Team
                  </h3>
                  <p className="text-sm text-white/90">
                    Collaborating in the field to deliver world-class geoscience
                    solutions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#9EDB9E]/50 hover:shadow-2xl transition-shadow duration-500 animate-in slide-in-from-bottom-4 duration-700 delay-400">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamRoles.map((role, index) => (
                <div
                  key={role}
                  className="flex items-center space-x-3 p-4 bg-[#9EDB9E]/10 rounded-lg hover:bg-[#4DA34D]/10 hover:scale-105 transition-all duration-300 animate-in slide-in-from-left-4"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-[#4DA34D] flex-shrink-0 animate-pulse" />
                  <span className="text-[#345363] font-medium">{role}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 animate-in fade-in duration-700 delay-800">
              <p className="text-lg text-stone-600 mb-6">
                Together, we deliver end-to-end solutions — on time and on
                budget.
              </p>
              <Badge className="bg-[#4DA34D] text-white text-base px-6 py-2 hover:scale-110 transition-transform duration-300">
                Multidisciplinary Excellence
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Regional Advantage with Photo Placeholder */}
      <section className="animate-in slide-in-from-left-8 duration-1000 delay-800">
        <Card className="bg-gradient-to-r from-[#345363] to-[#4DA34D] text-white hover:shadow-2xl transition-shadow duration-700 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1500" />
          <CardContent className="p-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="animate-in slide-in-from-left-6 duration-700">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <MapPin className="mr-3 h-6 w-6 text-[#9EDB9E] animate-bounce" />
                  Our Regional Advantage
                </h3>
                <p className="text-[#9EDB9E]/90 mb-6 leading-relaxed">
                  Operating in Sub-Saharan Africa demands local understanding,
                  cultural sensitivity, and adaptive skills. We combine this
                  local know-how with global technical standards, giving our
                  clients confidence to succeed even in the most challenging
                  environments.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center animate-in zoom-in duration-500 delay-300">
                    <div className="text-3xl font-bold text-[#9EDB9E] counter-animation">
                      50+
                    </div>
                    <div className="text-sm text-[#9EDB9E]/80">
                      Projects Delivered
                    </div>
                  </div>
                  <div className="text-center animate-in zoom-in duration-500 delay-500">
                    <div className="text-3xl font-bold text-[#9EDB9E] counter-animation">
                      4
                    </div>
                    <div className="text-sm text-[#9EDB9E]/80">
                      Countries Served
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Advantage Photo */}
              <div className="relative animate-in slide-in-from-right-6 duration-700 delay-300">
                <div className="relative h-64 rounded-lg overflow-hidden group-inner">
                  <img
                    src="/NATURE_8.jpg"
                    alt="Beautiful African landscape showcasing our regional operations environment"
                    className="w-full h-full object-cover group-inner-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#345363]/30 via-transparent to-transparent opacity-0 group-inner-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-inner-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm font-medium">
                      Sub-Saharan Africa Operations
                    </p>
                    <p className="text-xs text-white/90">
                      Where local expertise meets global standards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Our Journey Timeline with Enhanced Animations */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#345363] mb-4 flex items-center justify-center animate-in zoom-in duration-700">
            <Award className="mr-3 h-8 w-8 text-[#4DA34D] animate-spin-slow" />
            Our Journey
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto animate-in fade-in duration-700 delay-200">
            Key milestones in our mission to advance geoscience in Sub-Saharan
            Africa
          </p>
        </div>

        <div className="relative">
          {/* Animated Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-[#9EDB9E] via-[#4DA34D] to-[#345363] animate-pulse" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} animate-in slide-in-from-${index % 2 === 0 ? "left" : "right"}-8 duration-700`}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <Card
                    className={`w-full max-w-md ${index % 2 === 0 ? "mr-8" : "ml-8"} border-[#9EDB9E]/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 group relative`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#4DA34D] text-white group-hover:bg-[#345363] transition-colors duration-300">
                          {milestone.year}
                        </Badge>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#4DA34D] rounded-full border-4 border-white group-hover:scale-125 group-hover:bg-[#345363] transition-all duration-300 flex items-center justify-center">
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-lg text-[#345363] group-hover:text-[#4DA34D] transition-colors duration-300">
                        {milestone.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-stone-600 mb-4">
                        {milestone.description}
                      </CardDescription>

                      {/* Photos for different milestones */}
                      {milestone.hasPhoto && (
                        <div className="mt-4">
                          <div className="relative h-32 rounded-lg overflow-hidden group-photo">
                            <img
                              src={
                                milestone.year === "2018"
                                  ? "/Conception_2018_vintage_2.jpeg"
                                  : milestone.year === "2020"
                                    ? "/2020.jpg"
                                    : milestone.year === "2022"
                                      ? "/First_project_in_Burundi.jpg"
                                      : milestone.year === "2024"
                                        ? "/Quantum_Sensing.jpg"
                                        : ""
                              }
                              alt={
                                milestone.year === "2018"
                                  ? "GeoResolve Africa conception and founding vision in 2018"
                                  : milestone.year === "2020"
                                    ? "Official launch of GeoResolve Africa services in 2020"
                                    : milestone.year === "2022"
                                      ? "First international project team in Burundi marking regional expansion"
                                      : milestone.year === "2024"
                                        ? "Advanced quantum sensing research equipment and technology"
                                        : `${milestone.title} milestone`
                              }
                              className="w-full h-full object-cover group-photo-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#345363]/40 via-transparent to-transparent opacity-0 group-photo-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-photo-hover:opacity-100 transition-opacity duration-500">
                              <p className="text-xs font-medium">
                                {milestone.year === "2018"
                                  ? "Founding Vision"
                                  : milestone.year === "2020"
                                    ? "Service Launch"
                                    : milestone.year === "2022"
                                      ? "International Expansion"
                                      : milestone.year === "2024"
                                        ? "Quantum Sensing Research"
                                        : milestone.title}
                              </p>
                              <p className="text-xs text-white/90">
                                {milestone.year === "2018"
                                  ? "Building the foundation"
                                  : milestone.year === "2020"
                                    ? "Beginning operations"
                                    : milestone.year === "2022"
                                      ? "Expanding across borders"
                                      : milestone.year === "2024"
                                        ? "Advancing scientific innovation"
                                        : "Key milestone"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action with Pulsing Animation */}
      <section className="animate-in zoom-in duration-1000 delay-1000">
        <Card className="bg-[#345363] text-white hover:shadow-2xl transition-shadow duration-700 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1500" />
          <CardContent className="p-8 text-center relative z-10">
            <h3 className="text-2xl font-bold mb-4 animate-pulse">
              Partner With Us
            </h3>
            <p className="text-[#9EDB9E]/80 mb-6 max-w-2xl mx-auto">
              Join us in building Eastern Africa's largest geoscientific
              database while delivering innovative solutions for sustainable
              development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#4DA34D] hover:bg-[#9EDB9E] hover:text-[#345363] hover:scale-110 transition-all duration-300 group-btn"
                onClick={onNavigateToContact}
              >
                <Users className="mr-2 h-4 w-4 group-btn-hover:animate-bounce" />
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#9EDB9E] text-[#9EDB9E] hover:bg-[#9EDB9E] hover:text-[#345363] hover:scale-110 transition-all duration-300 group-btn"
                onClick={onNavigateToNews}
              >
                <Database className="mr-2 h-4 w-4 group-btn-hover:animate-pulse" />
                Explore Our Research
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutTab;
