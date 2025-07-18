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
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import NewsletterSignup from "./NewsletterSignup";

const ContactTab = () => {
  const [activeForm, setActiveForm] = useState<"contact" | "quote">("contact");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    location: "",
    timeline: "",
    budget: "",
    description: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Address",
      value: "info@georesolveafrica.com",
      description: "Send us an email for general inquiries",
      action: "mailto:info@georesolveafrica.com",
    },
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      value: "+256-771999614",
      description: "Call or send WhatsApp message",
      action: "tel:+256771999614",
    },
    {
      icon: MapPin,
      title: "Office Location",
      value: "Gayaza-Kampala Road, Kampala",
      description: "Gem Apartments Plot 77, Massoli Road",
      action: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon-Fri: 08:00-17:00",
      description: "East Africa Time (EAT)",
      action: null,
    },
  ];

  const projectTypes = [
    "Geotechnical Engineering",
    "Geophysical Surveys",
    "Environmental Consulting",
    "Laboratory Testing",
    "Autonomous Inspections",
    "Energy Transition Projects",
    "Other",
  ];

  const timelineOptions = [
    "Immediate (within 1 month)",
    "Short-term (1-3 months)",
    "Medium-term (3-6 months)",
    "Long-term (6+ months)",
    "To be determined",
  ];

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $500,000",
    "Over $500,000",
    "Prefer not to disclose",
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Contact form data:", contactForm);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Quote form data:", quoteForm);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuoteInputChange = (field: string, value: string) => {
    setQuoteForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="space-y-8">
        <section className="text-center">
          <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
            <CardContent className="p-8">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-900 mb-4">
                  Thank You for Contacting Us!
                </h1>
                <p className="text-green-700 mb-6">
                  We've received your{" "}
                  {activeForm === "contact" ? "message" : "quote request"} and
                  will get back to you within 24 hours. Our team is excited to
                  discuss your project with you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setContactForm({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                      setQuoteForm({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        projectType: "",
                        location: "",
                        timeline: "",
                        budget: "",
                        description: "",
                        requirements: "",
                      });
                    }}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  >
                    Send Another Message
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center">
        <Badge
          variant="secondary"
          className="bg-amber-100 text-amber-800 border-amber-200 mb-4"
        >
          Contact Us
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
          Get In Touch
        </h1>
        <p className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed">
          Ready to discuss your geoscience project? Contact our expert team for
          professional consultation and customized solutions.
        </p>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 border-stone-200"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-stone-900 mb-2">
                    {info.value}
                  </p>
                  <CardDescription className="text-stone-600 mb-4">
                    {info.description}
                  </CardDescription>
                  {info.action && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        info.action && window.open(info.action, "_blank")
                      }
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Contact
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Emergency Projects</h3>
              <p className="text-sm text-stone-600 mb-4">
                Need urgent geotechnical support?
              </p>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">WhatsApp Chat</h3>
              <p className="text-sm text-stone-600 mb-4">
                Quick questions? Chat with us
              </p>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Chat Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Forms */}
      <section>
        <div className="max-w-4xl mx-auto">
          {/* Form Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-stone-100 p-1 rounded-lg">
              <Button
                variant={activeForm === "contact" ? "default" : "ghost"}
                onClick={() => setActiveForm("contact")}
                className={
                  activeForm === "contact"
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : ""
                }
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                General Contact
              </Button>
              <Button
                variant={activeForm === "quote" ? "default" : "ghost"}
                onClick={() => setActiveForm("quote")}
                className={
                  activeForm === "quote"
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : ""
                }
              >
                <FileText className="mr-2 h-4 w-4" />
                Request Quote
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          {activeForm === "contact" && (
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-center">
                  Have a question or want to discuss your project? We'd love to
                  hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={contactForm.name}
                        onChange={(e) =>
                          handleContactInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={contactForm.email}
                        onChange={(e) =>
                          handleContactInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <Building className="mr-2 h-4 w-4" />
                        Company/Organization
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter company name"
                        value={contactForm.company}
                        onChange={(e) =>
                          handleContactInputChange("company", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        value={contactForm.phone}
                        onChange={(e) =>
                          handleContactInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      placeholder="What is this regarding?"
                      value={contactForm.subject}
                      onChange={(e) =>
                        handleContactInputChange("subject", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us about your project or inquiry"
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) =>
                        handleContactInputChange("message", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* reCAPTCHA placeholder */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <CheckCircle className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        reCAPTCHA verification would appear here
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Quote Form */}
          {activeForm === "quote" && (
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Request a Quote
                </CardTitle>
                <CardDescription className="text-center">
                  Tell us about your project requirements and we'll provide a
                  detailed proposal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={quoteForm.name}
                        onChange={(e) =>
                          handleQuoteInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={quoteForm.email}
                        onChange={(e) =>
                          handleQuoteInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <Building className="mr-2 h-4 w-4" />
                        Company/Organization *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter company name"
                        value={quoteForm.company}
                        onChange={(e) =>
                          handleQuoteInputChange("company", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        value={quoteForm.phone}
                        onChange={(e) =>
                          handleQuoteInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">
                        Project Type *
                      </label>
                      <select
                        className="w-full p-2 border border-stone-300 rounded-md"
                        value={quoteForm.projectType}
                        onChange={(e) =>
                          handleQuoteInputChange("projectType", e.target.value)
                        }
                        required
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Project Location *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter project location"
                        value={quoteForm.location}
                        onChange={(e) =>
                          handleQuoteInputChange("location", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">
                        Timeline *
                      </label>
                      <select
                        className="w-full p-2 border border-stone-300 rounded-md"
                        value={quoteForm.timeline}
                        onChange={(e) =>
                          handleQuoteInputChange("timeline", e.target.value)
                        }
                        required
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((timeline) => (
                          <option key={timeline} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">
                        Budget Range
                      </label>
                      <select
                        className="w-full p-2 border border-stone-300 rounded-md"
                        value={quoteForm.budget}
                        onChange={(e) =>
                          handleQuoteInputChange("budget", e.target.value)
                        }
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Project Description *
                    </label>
                    <Textarea
                      placeholder="Describe your project, objectives, and scope"
                      rows={4}
                      value={quoteForm.description}
                      onChange={(e) =>
                        handleQuoteInputChange("description", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">
                      Specific Requirements
                    </label>
                    <Textarea
                      placeholder="Any specific technical requirements, constraints, or preferences"
                      rows={3}
                      value={quoteForm.requirements}
                      onChange={(e) =>
                        handleQuoteInputChange("requirements", e.target.value)
                      }
                    />
                  </div>

                  {/* reCAPTCHA placeholder */}
                  <div className="flex items-center justify-center p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <CheckCircle className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        reCAPTCHA verification would appear here
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Request Quote
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section>
        <Card className="border-stone-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-amber-600" />
              <span>Our Location</span>
            </CardTitle>
            <CardDescription>
              Visit our office in Kampala, Uganda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for embedded map */}
            <div className="w-full h-96 bg-stone-100 rounded-lg flex items-center justify-center border-2 border-dashed border-stone-300">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                <p className="text-stone-600 mb-2">Interactive Map</p>
                <p className="text-sm text-stone-500 mb-4">
                  Gayaza-Kampala Road, Kampala, Uganda
                  <br />
                  Gem Apartments Plot 77, Massoli Road
                  <br />
                  P.O.BOX 113044 Kampala
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NewsletterSignup
            variant="full"
            title="Join Our Research Community"
            description="Subscribe for the latest research insights, project updates, and exclusive geoscience content delivered directly to your inbox."
          />
        </div>
      </section>

      {/* reCAPTCHA Notice */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-[#345363]">
                  Protected by reCAPTCHA
                </h3>
              </div>
              <p className="text-sm text-stone-600">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy" className="text-[#4DA34D] hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" className="text-[#4DA34D] hover:underline">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ContactTab;
