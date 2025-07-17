import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BUTTON_STYLES, CARD_STYLES, TYPOGRAPHY } from "@/styles/shared";
import { AlertCircle, ArrowRight, CheckCircle, Mail } from "lucide-react";
import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "full" | "compact" | "inline";
  className?: string;
  title?: string;
  description?: string;
}

const NewsletterSignup = ({
  variant = "full",
  className = "",
  title = "Join Our Research Community",
  description = "Subscribe for the latest research insights, database updates, and geoscientific discoveries",
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`text-center p-6 ${className}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#345363]">
            Thank you for subscribing!
          </h3>
          <p className="text-stone-600">
            You'll receive our latest research updates soon.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`${BUTTON_STYLES.primary} px-6 whitespace-nowrap`}
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={`${CARD_STYLES.default} ${className}`}>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Mail className="h-8 w-8 text-[#4DA34D] mx-auto mb-4" />
            <h3 className={TYPOGRAPHY.cardTitle}>{title}</h3>
            <p className="text-sm text-stone-600">{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />

            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full ${BUTTON_STYLES.primary}`}
            >
              {isLoading ? "Subscribing..." : "Join Research Community"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-stone-500 mt-4 text-center">
            Join researchers and professionals building tomorrow's
            knowledge-base.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Full variant
  return (
    <div className={`text-center ${className}`}>
      <div className="max-w-4xl mx-auto">
        <Mail className="h-16 w-16 text-[#4DA34D] mx-auto mb-6" />
        <h2 className={TYPOGRAPHY.sectionTitle}>{title}</h2>
        <p className={`${TYPOGRAPHY.sectionSubtitle} mb-12`}>{description}</p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1 h-14 rounded-full px-6 text-lg"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={`${BUTTON_STYLES.primary} h-14 px-10 rounded-full font-semibold text-lg`}
            >
              {isLoading ? "Subscribing..." : "Join Research Community"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-600 text-sm mt-4">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </form>

        <p className="text-sm text-stone-500 mt-6">
          Join researchers and professionals building tomorrow's knowledge-base.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
