
import React, { useState } from "react";
import { 
  User, 
  Globe, 
  Instagram, 
  Twitter, 
  Youtube,
  Camera,
  Save,
  Link as LinkIcon,
  Share2,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const CreatorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "Creative Artist",
    username: "creativeartist",
    bio: "Digital artist creating amazing content for my amazing supporters! I love bringing ideas to life through digital art and sharing my creative journey.",
    website: "https://myart.com",
    instagram: "@myartist",
    twitter: "@myartist",
    youtube: "@myartist",
    categories: ["Art", "Digital Content", "Tutorials"]
  });

  const [formData, setFormData] = useState(profileData);

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const handlePreview = () => {
    window.open(`/creator/${profileData.username}/pay/preview`, '_blank');
  };

  const handleShare = () => {
    const profileUrl = `${window.location.origin}/creator/${profileData.username}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard!");
  };

  const profileUrl = `${window.location.origin}/creator/${profileData.username}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">Creator Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your public creator profile and social links
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Profile
          </Button>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-brand-orange text-white text-xl">
                    {profileData.displayName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  {isEditing ? (
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      {profileData.displayName}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      @{profileData.username}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {profileData.bio}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      + Add Category
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {profileData.website || "Not set"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                {isEditing ? (
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    placeholder="@username"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {profileData.instagram || "Not set"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Label>
                {isEditing ? (
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                    placeholder="@username"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {profileData.twitter || "Not set"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube
                </Label>
                {isEditing ? (
                  <Input
                    id="youtube"
                    value={formData.youtube}
                    onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                    placeholder="@username"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {profileData.youtube || "Not set"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Preview & Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm font-mono break-all">
                  {profileUrl}
                </div>
                <Button variant="outline" className="w-full" onClick={handleShare}>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Copy Profile URL
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Profile Views</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Supporters</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Active Links</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">This Month</span>
                  <span className="font-medium text-green-600">+15.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
