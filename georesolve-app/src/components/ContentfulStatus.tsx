import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Settings, ExternalLink, Database, Key } from 'lucide-react';

interface ContentfulStatusProps {
  className?: string;
}

export const ContentfulStatus = ({ className = '' }: ContentfulStatusProps) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkContentfulConfig = async () => {
      const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
      const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

      const configured = Boolean(spaceId && accessToken);
      setIsConfigured(configured);

      if (configured) {
        try {
          const response = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?limit=1`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          setIsConnected(response.ok);
        } catch (error) {
          setIsConnected(false);
        }
      }

      setLoading(false);
    };

    checkContentfulConfig();
  }, []);

  if (loading) {
    return (
      <Card className={`border-slate-200 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600"></div>
            <span className="text-slate-600">Checking Contentful status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-slate-200 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-slate-600" />
            <CardTitle className="text-lg">Content Management System</CardTitle>
          </div>
          <Badge
            variant={isConnected ? "default" : "secondary"}
            className={isConnected ? "bg-green-500" : "bg-orange-500"}
          >
            {isConnected ? "Connected" : isConfigured ? "Configured" : "Not Set Up"}
          </Badge>
        </div>
        <CardDescription>
          {isConnected
            ? "✅ Contentful CMS is connected and ready to manage your content"
            : isConfigured
            ? "⚠️ Contentful is configured but connection failed"
            : "🔧 Set up Contentful to manage your website content"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Content management is active</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p>✅ You can now manage content through your Contentful dashboard</p>
              <p>✅ Changes will automatically update your website</p>
              <p>✅ Images are optimized and responsive</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => window.open('https://app.contentful.com', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Contentful Dashboard
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-orange-500">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isConfigured ? "Connection issue" : "Setup required"}
              </span>
            </div>

            {!isConfigured && (
              <div className="space-y-3">
                <p className="text-sm text-slate-600 mb-3">
                  Follow these steps to set up Contentful CMS:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <div>
                      <p className="font-medium">Create Contentful Account</p>
                      <p className="text-slate-600">Sign up at contentful.com (free tier available)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <div>
                      <p className="font-medium">Create Content Models</p>
                      <p className="text-slate-600">Set up models for articles, projects, and services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <div>
                      <p className="font-medium">Get API Credentials</p>
                      <p className="text-slate-600">Copy your Space ID and Access Token</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                    <div>
                      <p className="font-medium">Update Environment Variables</p>
                      <p className="text-slate-600">Add credentials to .env.local file</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open('https://contentful.com', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Sign Up for Contentful
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open('https://www.contentful.com/developers/docs/references/content-delivery-api/', '_blank')}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    API Documentation
                  </Button>
                </div>
              </div>
            )}

            {isConfigured && !isConnected && (
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  Configuration found but unable to connect. Please check:
                </p>
                <ul className="text-sm text-slate-600 space-y-1 ml-4">
                  <li>• Space ID is correct</li>
                  <li>• Access Token has proper permissions</li>
                  <li>• Network connectivity</li>
                </ul>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Retry Connection
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
