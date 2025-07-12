import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Mail, Phone, Search } from "lucide-react";

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

const NotFoundPage = ({
  onNavigateHome,
  onNavigateContact,
}: NotFoundPageProps) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full text-center border-[#9EDB9E]/50 shadow-xl">
        <CardContent className="p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://ext.same-assets.com/1481306800/2158712194.png"
              alt="GeoResolve Logo"
              className="h-16 w-auto"
            />
          </div>

          {/* 404 Heading */}
          <div className="mb-8">
            <h1 className="text-8xl lg:text-9xl font-bold text-[#345363] mb-4">
              404
            </h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#345363] mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-stone-600 leading-relaxed max-w-lg mx-auto">
              We couldn't find the page you're looking for. It might have been
              moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Illustration/Icon */}
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-[#9EDB9E]/20 to-[#4DA34D]/20 rounded-full flex items-center justify-center">
              <Search className="h-16 w-16 text-[#4DA34D]" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={onNavigateHome}
                className="bg-[#4DA34D] hover:bg-[#345363] text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Homepage
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onNavigateContact}
                className="border-2 border-[#345363] text-[#345363] hover:bg-[#9EDB9E]/20 px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </div>

            {/* Additional Help */}
            <div className="pt-6 border-t border-[#9EDB9E]/30 mt-8">
              <p className="text-stone-500 mb-4">Need immediate assistance?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a
                  href="mailto:info@georesolveafrica.com"
                  className="flex items-center justify-center text-[#345363] hover:text-[#4DA34D] transition-colors duration-200"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  info@georesolveafrica.com
                </a>
                <a
                  href="tel:+256771999614"
                  className="flex items-center justify-center text-[#345363] hover:text-[#4DA34D] transition-colors duration-200"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  +256-771999614
                </a>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-8 pt-6 border-t border-[#9EDB9E]/30">
            <h3 className="text-lg font-semibold text-[#345363] mb-2">
              GeoResolve Africa
            </h3>
            <p className="text-stone-600 text-sm">
              Leading geoscience consulting firm specializing in sustainable
              infrastructure development across Sub-Saharan Africa.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
