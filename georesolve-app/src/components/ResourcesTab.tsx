import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardList,
  Download,
  ExternalLink,
  Eye,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Filter,
  Globe,
  HardDrive,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Settings,
  SortAsc,
  SortDesc,
  Target,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import CoordinateConverter from "./CoordinateConverter";
import DMSConverter from "./DMSConverter";
import KMLGenerator from "./KMLGenerator";
import NewsletterSignup from "./NewsletterSignup";

const ResourcesTab = ({
  onNavigateToContact,
}: {
  onNavigateToContact: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const [selectedDateRanges, setSelectedDateRanges] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const categories = [
    { id: "standards", label: "Standards & Guidelines" },
    { id: "case-studies", label: "Case Studies" },
    { id: "data-sheets", label: "Technical Data Sheets" },
    { id: "research", label: "Research Papers" },
    { id: "tools", label: "Tools & Software" },
    { id: "templates", label: "Templates" },
    { id: "free-software", label: "Free Geotechnical Software" },
  ];

  const fileTypes = [
    { id: "pdf", label: "PDF Documents" },
    { id: "xlsx", label: "Excel Spreadsheets" },
    { id: "docx", label: "Word Documents" },
    { id: "pptx", label: "Presentations" },
    { id: "dwg", label: "CAD Files" },
    { id: "zip", label: "Archives" },
  ];

  const dateRanges = [
    { id: "2024", label: "2024" },
    { id: "2023", label: "2023" },
    { id: "2022", label: "2022" },
    { id: "older", label: "Before 2022" },
  ];

  const resources = [
    {
      id: 1,
      name: "Geotechnical Investigation Standards for Sub-Saharan Africa",
      category: "standards",
      categoryLabel: "Standards & Guidelines",
      datePublished: "2024-12-15",
      format: "pdf",
      description:
        "Comprehensive guidelines for conducting geotechnical investigations in diverse African geological conditions.",
      fileSize: "2.4 MB",
      downloads: 1250,
      featured: true,
    },
    {
      id: 2,
      name: "Highway Foundation Design Case Study - Kampala-Entebbe",
      category: "case-studies",
      categoryLabel: "Case Studies",
      datePublished: "2024-11-28",
      format: "pdf",
      description:
        "Detailed analysis of foundation design challenges and solutions for major highway infrastructure.",
      fileSize: "5.8 MB",
      downloads: 890,
      featured: true,
    },
    {
      id: 3,
      name: "Soil Classification Data Sheet - East African Soils",
      category: "data-sheets",
      categoryLabel: "Technical Data Sheets",
      datePublished: "2024-11-15",
      format: "xlsx",
      description:
        "Comprehensive soil classification database for East African geological formations.",
      fileSize: "1.2 MB",
      downloads: 654,
      featured: false,
    },
    {
      id: 4,
      name: "Geophysical Survey Research Paper - Lake Victoria Region",
      category: "research",
      categoryLabel: "Research Papers",
      datePublished: "2024-10-30",
      format: "pdf",
      description:
        "Advanced geophysical investigation techniques applied to Lake Victoria basin geology.",
      fileSize: "3.7 MB",
      downloads: 432,
      featured: false,
    },
    {
      id: 5,
      name: "Slope Stability Analysis Tool",
      category: "tools",
      categoryLabel: "Tools & Software",
      datePublished: "2024-10-15",
      format: "zip",
      description:
        "Excel-based calculation tool for slope stability analysis with African geological parameters.",
      fileSize: "890 KB",
      downloads: 756,
      featured: true,
    },
    {
      id: 6,
      name: "Geotechnical Report Template",
      category: "templates",
      categoryLabel: "Templates",
      datePublished: "2024-09-20",
      format: "docx",
      description:
        "Professional template for geotechnical investigation reports following international standards.",
      fileSize: "245 KB",
      downloads: 1120,
      featured: false,
    },
    {
      id: 7,
      name: "Drilling Log Data Sheets",
      category: "data-sheets",
      categoryLabel: "Technical Data Sheets",
      datePublished: "2024-09-10",
      format: "xlsx",
      description:
        "Standardized drilling log templates for borehole data recording and analysis.",
      fileSize: "680 KB",
      downloads: 523,
      featured: false,
    },
    {
      id: 8,
      name: "Mining Geophysics Best Practices Guide",
      category: "standards",
      categoryLabel: "Standards & Guidelines",
      datePublished: "2024-08-25",
      format: "pdf",
      description:
        "Industry best practices for geophysical surveys in mining exploration projects.",
      fileSize: "4.1 MB",
      downloads: 378,
      featured: false,
    },
    {
      id: 9,
      name: "Hydropower Site Investigation Case Study - Burundi",
      category: "case-studies",
      categoryLabel: "Case Studies",
      datePublished: "2024-08-10",
      format: "pdf",
      description:
        "Complete site investigation process for small hydropower development in mountainous terrain.",
      fileSize: "6.2 MB",
      downloads: 445,
      featured: true,
    },
    {
      id: 10,
      name: "Laboratory Testing Procedures Manual",
      category: "standards",
      categoryLabel: "Standards & Guidelines",
      datePublished: "2024-07-15",
      format: "pdf",
      description:
        "Comprehensive manual for soil and rock laboratory testing procedures and quality control.",
      fileSize: "3.3 MB",
      downloads: 687,
      featured: false,
    },
    {
      id: 11,
      name: "GIS Mapping Templates for Geoscience Projects",
      category: "templates",
      categoryLabel: "Templates",
      datePublished: "2024-06-30",
      format: "zip",
      description:
        "ArcGIS and QGIS templates for geological and geotechnical mapping projects.",
      fileSize: "15.4 MB",
      downloads: 334,
      featured: false,
    },
    {
      id: 12,
      name: "Resistivity Survey Data Analysis Tool",
      category: "tools",
      categoryLabel: "Tools & Software",
      datePublished: "2024-06-15",
      format: "xlsx",
      description:
        "Advanced Excel-based tool for electrical resistivity survey data processing and interpretation.",
      fileSize: "1.8 MB",
      downloads: 298,
      featured: false,
    },
  ];

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case "docx":
      case "doc":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "pptx":
      case "ppt":
        return <FileImage className="h-5 w-5 text-orange-500" />;
      case "zip":
      case "rar":
        return <HardDrive className="h-5 w-5 text-purple-500" />;
      case "dwg":
      case "dxf":
        return <Settings className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-stone-500" />;
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return "PDF";
      case "xlsx":
        return "Excel";
      case "docx":
        return "Word";
      case "pptx":
        return "PowerPoint";
      case "zip":
        return "ZIP";
      case "dwg":
        return "CAD";
      default:
        return format.toUpperCase();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "standards":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "case-studies":
        return "bg-green-100 text-green-800 border-green-200";
      case "data-sheets":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "research":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "tools":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "templates":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDateRange = (dateString: string) => {
    const year = new Date(dateString).getFullYear();
    if (year === 2024) return "2024";
    if (year === 2023) return "2023";
    if (year === 2022) return "2022";
    return "older";
  };

  const filteredResources = resources
    .filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(resource.category);
      const matchesFileType =
        selectedFileTypes.length === 0 ||
        selectedFileTypes.includes(resource.format);
      const matchesDateRange =
        selectedDateRanges.length === 0 ||
        selectedDateRanges.includes(getDateRange(resource.datePublished));

      return (
        matchesSearch && matchesCategory && matchesFileType && matchesDateRange
      );
    })
    .sort((a, b) => {
      let aValue;
      let bValue;

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "category":
          aValue = a.categoryLabel.toLowerCase();
          bValue = b.categoryLabel.toLowerCase();
          break;
        case "date":
          aValue = new Date(a.datePublished).getTime();
          bValue = new Date(b.datePublished).getTime();
          break;
        case "downloads":
          aValue = a.downloads;
          bValue = b.downloads;
          break;
        case "size":
          aValue = Number.parseFloat(a.fileSize.replace(/[^\d.]/g, ""));
          bValue = Number.parseFloat(b.fileSize.replace(/[^\d.]/g, ""));
          break;
        default:
          return 0;
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleCategoryFilter = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    }
  };

  const handleFileTypeFilter = (fileTypeId: string, checked: boolean) => {
    if (checked) {
      setSelectedFileTypes([...selectedFileTypes, fileTypeId]);
    } else {
      setSelectedFileTypes(selectedFileTypes.filter((id) => id !== fileTypeId));
    }
  };

  const handleDateRangeFilter = (dateRangeId: string, checked: boolean) => {
    if (checked) {
      setSelectedDateRanges([...selectedDateRanges, dateRangeId]);
    } else {
      setSelectedDateRanges(
        selectedDateRanges.filter((id) => id !== dateRangeId),
      );
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-stone-400" />;
    }
    return sortDirection === "asc" ? (
      <SortAsc className="h-4 w-4 text-[#4DA34D]" />
    ) : (
      <SortDesc className="h-4 w-4 text-[#4DA34D]" />
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center animate-in slide-in-from-bottom-4 duration-1000">
        <Badge
          variant="secondary"
          className="bg-[#9EDB9E] text-[#345363] border-[#4DA34D] mb-4 animate-pulse"
        >
          Resources Library
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold text-[#345363] mb-6 animate-in slide-in-from-left-6 duration-1000 delay-200">
          Technical Resources & Downloads
        </h1>
        <p className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed animate-in slide-in-from-right-6 duration-1000 delay-300">
          Access our comprehensive library of technical resources, standards,
          case studies, and tools. Download industry-leading materials to
          support your geoscience projects and contribute to Eastern Africa's
          largest technical database.
        </p>
      </section>

      {/* Search Bar */}
      <section className="animate-in slide-in-from-bottom-6 duration-1000 delay-400">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <Input
            placeholder="Search resources, descriptions, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 text-lg border-[#9EDB9E]/50 focus:border-[#4DA34D] shadow-lg"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="animate-in slide-in-from-bottom-6 duration-1000 delay-500">
        <Card className="border-[#9EDB9E]/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-[#345363]">
              <Filter className="h-5 w-5 mr-2 text-[#4DA34D]" />
              Filter Resources
            </CardTitle>
            <CardDescription>
              Narrow down your search by category, file type, or publication
              date
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-[#345363] mb-4 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-[#4DA34D]" />
                  Category
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) =>
                          handleCategoryFilter(category.id, checked as boolean)
                        }
                        className="border-[#9EDB9E] data-[state=checked]:bg-[#4DA34D] data-[state=checked]:border-[#4DA34D]"
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm text-stone-600 cursor-pointer hover:text-[#345363] transition-colors"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Type Filter */}
              <div>
                <h4 className="font-semibold text-[#345363] mb-4 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-[#4DA34D]" />
                  File Type
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {fileTypes.map((fileType) => (
                    <div
                      key={fileType.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`filetype-${fileType.id}`}
                        checked={selectedFileTypes.includes(fileType.id)}
                        onCheckedChange={(checked) =>
                          handleFileTypeFilter(fileType.id, checked as boolean)
                        }
                        className="border-[#9EDB9E] data-[state=checked]:bg-[#4DA34D] data-[state=checked]:border-[#4DA34D]"
                      />
                      <label
                        htmlFor={`filetype-${fileType.id}`}
                        className="text-sm text-stone-600 cursor-pointer hover:text-[#345363] transition-colors"
                      >
                        {fileType.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <h4 className="font-semibold text-[#345363] mb-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-[#4DA34D]" />
                  Date Published
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {dateRanges.map((dateRange) => (
                    <div
                      key={dateRange.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`date-${dateRange.id}`}
                        checked={selectedDateRanges.includes(dateRange.id)}
                        onCheckedChange={(checked) =>
                          handleDateRangeFilter(
                            dateRange.id,
                            checked as boolean,
                          )
                        }
                        className="border-[#9EDB9E] data-[state=checked]:bg-[#4DA34D] data-[state=checked]:border-[#4DA34D]"
                      />
                      <label
                        htmlFor={`date-${dateRange.id}`}
                        className="text-sm text-stone-600 cursor-pointer hover:text-[#345363] transition-colors"
                      >
                        {dateRange.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Summary & Clear */}
            {(selectedCategories.length > 0 ||
              selectedFileTypes.length > 0 ||
              selectedDateRanges.length > 0) && (
              <div className="pt-6 border-t border-[#9EDB9E]/30">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-stone-600">
                      Active filters:
                    </span>
                    {selectedCategories.map((cat) => (
                      <Badge
                        key={cat}
                        variant="outline"
                        className="border-[#4DA34D] text-[#345363]"
                      >
                        {categories.find((c) => c.id === cat)?.label}
                      </Badge>
                    ))}
                    {selectedFileTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="outline"
                        className="border-[#4DA34D] text-[#345363]"
                      >
                        {fileTypes.find((f) => f.id === type)?.label}
                      </Badge>
                    ))}
                    {selectedDateRanges.map((range) => (
                      <Badge
                        key={range}
                        variant="outline"
                        className="border-[#4DA34D] text-[#345363]"
                      >
                        {dateRanges.find((d) => d.id === range)?.label}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedFileTypes([]);
                      setSelectedDateRanges([]);
                    }}
                    className="text-[#345363] border-[#345363] hover:bg-[#9EDB9E]/20"
                  >
                    Clear All Filters
                  </Button>
                </div>
                <p className="text-sm text-stone-500 mt-2">
                  Showing {filteredResources.length} of {resources.length}{" "}
                  resources
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Resources Data Table */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-600">
        <Card className="border-[#9EDB9E]/50 shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#345363] to-[#4DA34D] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("name")}
                      className="text-white hover:bg-white/20 p-0 h-auto font-semibold flex items-center space-x-2"
                    >
                      <span>Resource Name</span>
                      {getSortIcon("name")}
                    </Button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("category")}
                      className="text-white hover:bg-white/20 p-0 h-auto font-semibold flex items-center space-x-2"
                    >
                      <span>Category</span>
                      {getSortIcon("category")}
                    </Button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("date")}
                      className="text-white hover:bg-white/20 p-0 h-auto font-semibold flex items-center space-x-2"
                    >
                      <span>Published</span>
                      {getSortIcon("date")}
                    </Button>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Format</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("size")}
                      className="text-white hover:bg-white/20 p-0 h-auto font-semibold flex items-center space-x-2"
                    >
                      <span>Size</span>
                      {getSortIcon("size")}
                    </Button>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource, index) => (
                  <tr
                    key={resource.id}
                    className={`border-b border-[#9EDB9E]/20 hover:bg-[#9EDB9E]/10 transition-all duration-200 group ${
                      index % 2 === 0 ? "bg-white" : "bg-[#FAF9F6]"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        {getFileIcon(resource.format)}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-[#345363] text-sm leading-5 group-hover:text-[#4DA34D] transition-colors">
                            {resource.name}
                          </h3>
                          {resource.featured && (
                            <Badge className="mt-1 bg-[#4DA34D]/10 text-[#4DA34D] border-[#4DA34D]/30 text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getCategoryColor(resource.category)}>
                        {resource.categoryLabel}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-stone-600 text-sm">
                      {formatDate(resource.datePublished)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(resource.format)}
                        <span className="text-sm font-medium text-stone-600">
                          {getFormatLabel(resource.format)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-stone-600 line-clamp-2 max-w-xs leading-relaxed">
                        {resource.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-stone-600 text-sm font-medium">
                      {resource.fileSize}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-[#4DA34D] hover:bg-[#345363] text-white hover:scale-105 transition-all duration-300 shadow-sm"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#9EDB9E] text-[#345363] hover:bg-[#9EDB9E]/20 hover:scale-105 transition-all duration-300"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden p-4 space-y-4">
            {filteredResources.map((resource, index) => (
              <Card
                key={resource.id}
                className="border-[#9EDB9E]/30 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      {getFileIcon(resource.format)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#345363] text-sm leading-5">
                          {resource.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            className={getCategoryColor(resource.category)}
                          >
                            {resource.categoryLabel}
                          </Badge>
                          {resource.featured && (
                            <Badge className="bg-[#4DA34D]/10 text-[#4DA34D] border-[#4DA34D]/30 text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 mb-3 line-clamp-2 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-500 mb-3">
                    <div>
                      <span className="font-medium">Published:</span>{" "}
                      {formatDate(resource.datePublished)}
                    </div>
                    <div>
                      <span className="font-medium">Size:</span>{" "}
                      {resource.fileSize}
                    </div>
                    <div>
                      <span className="font-medium">Format:</span>{" "}
                      {getFormatLabel(resource.format)}
                    </div>
                    <div>
                      <span className="font-medium">Downloads:</span>{" "}
                      {resource.downloads.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#4DA34D] hover:bg-[#345363] text-white"
                    >
                      <Download className="h-3 w-3 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#9EDB9E] text-[#345363] hover:bg-[#9EDB9E]/20 px-3"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-stone-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-600 mb-2">
                No resources found
              </h3>
              <p className="text-stone-500 mb-4">
                Try adjusting your search terms or filters to find more
                resources.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategories([]);
                  setSelectedFileTypes([]);
                  setSelectedDateRanges([]);
                }}
                className="border-[#4DA34D] text-[#345363] hover:bg-[#9EDB9E]/20"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </Card>
      </section>

      {/* GeoResolve Tools Section */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-650">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#345363] mb-4">
            GeoResolve Tools
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Professional geospatial calculation tools for field work and data
            processing. Developed by our engineering team for the geoscience
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coordinate Conversion Tool */}
          <Card
            id="coordinate-conversion-tool"
            className="border-[#9EDB9E]/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl text-[#345363] flex items-center">
                <Globe className="h-6 w-6 mr-3 text-[#4DA34D]" />
                Coordinate Conversion
              </CardTitle>
              <CardDescription>
                Convert between UTM, Geographic (WGS84), and local coordinate
                systems commonly used in Sub-Saharan Africa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#FAF9F6] p-6 rounded-lg border border-[#9EDB9E]/30">
                <h4 className="font-semibold text-[#345363] mb-3">Features:</h4>
                <ul className="text-sm text-stone-600 space-y-2">
                  <li>• UTM to Geographic coordinates</li>
                  <li>• Support for UTM zones 35N, 36N, 37N (East Africa)</li>
                  <li>• WGS84, Clarke 1880, and Adindan datum support</li>
                  <li>• Batch coordinate processing</li>
                  <li>• Export results to CSV/Excel</li>
                </ul>
              </div>

              {/* Enhanced Coordinate Conversion Tool */}
              <div className="bg-white rounded-lg border border-[#9EDB9E]/30 overflow-hidden">
                <CoordinateConverter />
              </div>
            </CardContent>
          </Card>

          {/* Decimal to DMS Conversion Tool */}
          <Card
            id="dms-conversion-tool"
            className="border-[#9EDB9E]/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl text-[#345363] flex items-center">
                <Target className="h-6 w-6 mr-3 text-[#4DA34D]" />
                Decimal ↔ DMS Converter
              </CardTitle>
              <CardDescription>
                Convert between decimal degrees and degrees-minutes-seconds
                (DMS) format for precise field measurements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#FAF9F6] p-6 rounded-lg border border-[#9EDB9E]/30">
                <h4 className="font-semibold text-[#345363] mb-3">Features:</h4>
                <ul className="text-sm text-stone-600 space-y-2">
                  <li>• Decimal degrees to DMS conversion</li>
                  <li>• DMS to decimal degrees conversion</li>
                  <li>• Support for NSEW hemisphere indicators</li>
                  <li>
                    • High precision calculations (up to 6 decimal places)
                  </li>
                  <li>• Bulk conversion for survey data</li>
                </ul>
              </div>

              {/* Enhanced DMS Conversion Tool */}
              <div className="bg-white rounded-lg border border-[#9EDB9E]/30 overflow-hidden">
                <DMSConverter />
              </div>
            </CardContent>
          </Card>

          {/* KML Generation Tool */}
          <Card
            id="kml-generation-tool"
            className="border-[#9EDB9E]/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl text-[#345363] flex items-center">
                <FileText className="h-6 w-6 mr-3 text-[#4DA34D]" />
                KML File Generator
              </CardTitle>
              <CardDescription>
                Generate KML files from coordinate data for Google Earth
                visualization and project documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#FAF9F6] p-6 rounded-lg border border-[#9EDB9E]/30">
                <h4 className="font-semibold text-[#345363] mb-3">Features:</h4>
                <ul className="text-sm text-stone-600 space-y-2">
                  <li>• Create KML from coordinate lists</li>
                  <li>• Add custom placemark icons and colors</li>
                  <li>• Include project metadata and descriptions</li>
                  <li>• Generate polygons and polylines</li>
                  <li>• Direct export for Google Earth Pro</li>
                </ul>
              </div>

              {/* Enhanced KML Generation Tool */}
              <div className="bg-white rounded-lg border border-[#9EDB9E]/30 overflow-hidden">
                <KMLGenerator />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Usage Information */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-[#9EDB9E]/10 to-[#4DA34D]/10 border-[#4DA34D]/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[#345363] mb-4">
                Professional Geospatial Tools
              </h3>
              <p className="text-lg text-stone-600 mb-6 max-w-3xl mx-auto">
                These tools have been developed and tested by our field
                engineers working across Uganda, Burundi, Rwanda, and Kenya. All
                calculations follow international standards and are optimized
                for East African coordinate systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#4DA34D] hover:bg-[#345363] text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download Tools Guide (PDF)
                </Button>
                <Button
                  variant="outline"
                  className="border-[#345363] text-[#345363] hover:bg-[#9EDB9E]/20"
                  onClick={onNavigateToContact}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Request Custom Tool Development
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resource Statistics */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-700">
        <Card className="bg-gradient-to-r from-[#345363] to-[#4DA34D] text-white shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-in zoom-in duration-500 delay-100">
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">
                  {resources.length}
                </div>
                <div className="text-[#9EDB9E]/80">Total Resources</div>
              </div>
              <div className="animate-in zoom-in duration-500 delay-200">
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">
                  {resources
                    .reduce((sum, resource) => sum + resource.downloads, 0)
                    .toLocaleString()}
                </div>
                <div className="text-[#9EDB9E]/80">Total Downloads</div>
              </div>
              <div className="animate-in zoom-in duration-500 delay-300">
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">
                  {categories.length}
                </div>
                <div className="text-[#9EDB9E]/80">Categories</div>
              </div>
              <div className="animate-in zoom-in duration-500 delay-400">
                <div className="text-3xl font-bold text-[#9EDB9E] mb-2">
                  {fileTypes.length}
                </div>
                <div className="text-[#9EDB9E]/80">File Formats</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Submit Resource CTA */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-800">
        <Card className="bg-[#FAF9F6] border-[#9EDB9E]/50 overflow-hidden relative group shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9EDB9E]/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          <CardContent className="p-12 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <Upload className="h-16 w-16 text-[#4DA34D] mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-[#345363] mb-4">
                Contribute to Our Resource Library
              </h3>
              <p className="text-stone-600 mb-8 text-lg leading-relaxed">
                Share your expertise with the geoscience community. Submit
                technical resources, research papers, case studies, or tools to
                help build Eastern Africa's largest geoscientific knowledge
                base.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-white rounded-2xl border border-[#9EDB9E]/30 hover:shadow-lg transition-shadow duration-300">
                  <BookOpen className="h-10 w-10 text-[#4DA34D] mx-auto mb-3" />
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Research Papers
                  </h4>
                  <p className="text-sm text-stone-600">
                    Share your latest research findings and contribute to
                    scientific knowledge
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-[#9EDB9E]/30 hover:shadow-lg transition-shadow duration-300">
                  <ClipboardList className="h-10 w-10 text-[#4DA34D] mx-auto mb-3" />
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Case Studies
                  </h4>
                  <p className="text-sm text-stone-600">
                    Document project experiences and lessons learned for the
                    community
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-[#9EDB9E]/30 hover:shadow-lg transition-shadow duration-300">
                  <Settings className="h-10 w-10 text-[#4DA34D] mx-auto mb-3" />
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Tools & Templates
                  </h4>
                  <p className="text-sm text-stone-600">
                    Share calculation tools and templates to accelerate project
                    delivery
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-[#4DA34D]/10 to-[#9EDB9E]/20 rounded-2xl border border-[#4DA34D]/30 hover:shadow-lg transition-shadow duration-300">
                  <MessageCircle className="h-10 w-10 text-[#4DA34D] mx-auto mb-3" />
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Suggest New Tools
                  </h4>
                  <p className="text-sm text-stone-600">
                    Propose geoscientific calculation tools that would benefit
                    the East African community
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#4DA34D] hover:bg-[#345363] text-white hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={onNavigateToContact}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Submit Your Resource
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#4DA34D] to-[#345363] text-white hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={onNavigateToContact}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Suggest a Tool
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#345363] text-[#345363] hover:bg-[#9EDB9E]/20 hover:scale-105 transition-all duration-300"
                  onClick={onNavigateToContact}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Our Team
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-[#9EDB9E]/30">
                <p className="text-stone-500 text-sm">
                  All submissions and tool suggestions are reviewed by our
                  technical team to ensure quality and relevance to the
                  geoscience community. Contributors receive recognition and
                  access to exclusive resources. Tool suggestions help us
                  prioritize development of the most needed geoscientific
                  calculators for East Africa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tool Suggestions Call-to-Action */}
      <section className="animate-in slide-in-from-bottom-8 duration-1000 delay-900">
        <Card className="bg-gradient-to-r from-[#4DA34D]/10 via-[#9EDB9E]/20 to-[#345363]/10 border-[#4DA34D]/50 overflow-hidden relative group shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4DA34D]/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1500" />
          <CardContent className="p-8 relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#4DA34D]/20 rounded-full mx-auto mb-6">
                <MessageCircle className="h-10 w-10 text-[#4DA34D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#345363] mb-4">
                Help Shape the Future of Geoscience Tools
              </h3>
              <p className="text-stone-600 mb-6 text-lg leading-relaxed max-w-3xl mx-auto">
                What geoscientific calculation tools would make your work
                easier? Share your ideas and help us build the most
                comprehensive suite of free, professional-grade tools for the
                East African geoscience community.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                <div className="bg-white/70 p-4 rounded-lg border border-[#9EDB9E]/30">
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Foundation Design Calculators
                  </h4>
                  <p className="text-sm text-stone-600">
                    Bearing capacity, settlement analysis, pile design tools
                  </p>
                </div>
                <div className="bg-white/70 p-4 rounded-lg border border-[#9EDB9E]/30">
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Geophysical Data Processors
                  </h4>
                  <p className="text-sm text-stone-600">
                    Resistivity analysis, seismic interpretation, gravity
                    modeling
                  </p>
                </div>
                <div className="bg-white/70 p-4 rounded-lg border border-[#9EDB9E]/30">
                  <h4 className="font-semibold text-[#345363] mb-2">
                    Environmental Assessments
                  </h4>
                  <p className="text-sm text-stone-600">
                    Contamination modeling, groundwater flow, risk assessment
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#4DA34D] hover:bg-[#345363] text-white hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={onNavigateToContact}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Suggest a Tool Idea
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#4DA34D] text-[#345363] hover:bg-[#9EDB9E]/20 hover:scale-105 transition-all duration-300"
                  onClick={onNavigateToContact}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Development Discussion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <NewsletterSignup
            variant="compact"
            title="Resource Updates & Notifications"
            description="Get notified when new resources are added to our database and receive exclusive geoscience tools."
            className="max-w-md mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default ResourcesTab;
