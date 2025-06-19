
import React, { useState } from "react";
import { 
  Heart, 
  Star, 
  Coffee, 
  Gift, 
  Share2, 
  DollarSign,
  MessageCircle,
  User,
  Globe,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CreatorPaymentPageProps {
  creatorData?: {
    displayName: string;
    bio: string;
    profileImage?: string;
    website?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    categories: string[];
  };
  paymentData?: {
    name: string;
    description?: string;
    amount?: number;
    currency: string;
    customAmountAllowed?: boolean;
  };
}

const CreatorPaymentPage: React.FC<CreatorPaymentPageProps> = ({
  creatorData = {
    displayName: "Creative Artist",
    bio: "Digital artist creating amazing content for my amazing supporters!",
    website: "https://myart.com",
    instagram: "@myartist",
    twitter: "@myartist", 
    youtube: "@myartist",
    categories: ["Art", "Digital Content", "Tutorials"]
  },
  paymentData = {
    name: "Support My Creative Work",
    description: "Help me continue creating amazing content!",
    amount: 25,
    currency: "USD",
    customAmountAllowed: true
  }
}) => {
  const [selectedAmount, setSelectedAmount] = useState(paymentData.amount || 25);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [supporterName, setSupporterName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const quickAmounts = [5, 10, 25, 50, 100];

  const handlePayment = () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    toast.success(`Processing payment of $${finalAmount.toFixed(2)}`);
  };

  const handleShare = () => {
    navigator.share?.({
      title: `Support ${creatorData.displayName}`,
      text: creatorData.bio,
      url: window.location.href
    }) || toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Creator Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={creatorData.profileImage} />
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{creatorData.displayName}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{creatorData.bio}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {creatorData.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">{category}</Badge>
                  ))}
                </div>

                <div className="flex justify-center md:justify-start gap-4">
                  {creatorData.website && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={creatorData.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {creatorData.instagram && (
                    <Button variant="ghost" size="sm">
                      <Instagram className="h-4 w-4" />
                    </Button>
                  )}
                  {creatorData.twitter && (
                    <Button variant="ghost" size="sm">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  )}
                  {creatorData.youtube && (
                    <Button variant="ghost" size="sm">
                      <Youtube className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                {paymentData.name}
              </CardTitle>
              {paymentData.description && (
                <p className="text-gray-600 dark:text-gray-300">{paymentData.description}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Selection */}
              <div className="space-y-4">
                <Label>Choose Amount</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? "default" : "outline"}
                      className={selectedAmount === amount ? "bg-brand-orange hover:bg-brand-orange/90 text-white" : ""}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                
                {paymentData.customAmountAllowed && (
                  <div className="space-y-2">
                    <Label>Or enter custom amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(0);
                        }}
                        className="pl-9"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Supporter Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Your Name (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <Label htmlFor="anonymous" className="text-sm">Stay Anonymous</Label>
                  </div>
                </div>
                <Input
                  placeholder="Your name"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  disabled={isAnonymous}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label>Message to Creator (Optional)</Label>
                <Textarea
                  placeholder="Leave a supportive message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Payment Button */}
              <Button 
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                onClick={handlePayment}
              >
                <Gift className="h-4 w-4 mr-2" />
                Support with ${(customAmount ? parseFloat(customAmount) || 0 : selectedAmount).toFixed(2)}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Recent Supporters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Anonymous", amount: 25, message: "Love your work!", time: "2 hours ago" },
                  { name: "Sarah M.", amount: 50, message: "Keep creating!", time: "5 hours ago" },
                  { name: "Mike R.", amount: 15, message: "", time: "1 day ago" },
                  { name: "Anonymous", amount: 100, message: "You're inspiring!", time: "2 days ago" },
                ].map((support, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {support.name === "Anonymous" ? "?" : support.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{support.name}</span>
                        <Badge variant="outline" className="text-xs">
                          ${support.amount}
                        </Badge>
                      </div>
                      {support.message && (
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                          "{support.message}"
                        </p>
                      )}
                      <p className="text-xs text-gray-500">{support.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatorPaymentPage;
