
import React from "react";
import { 
  DollarSign, 
  Users, 
  Link, 
  TrendingUp, 
  Heart,
  Star,
  Gift,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CreatorDashboard = () => {
  const stats = {
    totalEarnings: 2450.75,
    supporters: 89,
    activeLinks: 12,
    thisMonthGrowth: 15.2
  };

  const recentSupports = [
    { id: 1, supporter: "Anonymous", amount: 25.00, message: "Love your work!", time: "2 hours ago" },
    { id: 2, supporter: "Sarah M.", amount: 50.00, message: "Keep creating amazing content!", time: "5 hours ago" },
    { id: 3, supporter: "Mike R.", amount: 15.00, message: "", time: "1 day ago" },
    { id: 4, supporter: "Anonymous", amount: 100.00, message: "You're an inspiration!", time: "2 days ago" },
  ];

  const topLinks = [
    { name: "Support My Art", earnings: 1250.00, supporters: 34 },
    { name: "Coffee Fund", earnings: 680.50, supporters: 27 },
    { name: "Monthly Tip", earnings: 520.25, supporters: 28 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white text-gray-900">Creator Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track your earnings and supporter engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supporters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.supporters}</div>
            <p className="text-xs text-muted-foreground">Total supporters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Links</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLinks}</div>
            <p className="text-xs text-muted-foreground">Payment links</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.thisMonthGrowth}%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Recent Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSupports.map((support) => (
                <div key={support.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{support.supporter}</span>
                      <Badge variant="outline" className="text-xs">
                        ${support.amount.toFixed(2)}
                      </Badge>
                    </div>
                    {support.message && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        "{support.message}"
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{support.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Support
            </Button>
          </CardContent>
        </Card>

        {/* Top Performing Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Top Performing Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <div className="font-medium">{link.name}</div>
                    <div className="text-sm text-gray-500">
                      {link.supporters} supporters
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${link.earnings.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage All Links
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto flex-col p-6 bg-brand-orange hover:bg-brand-orange/90 text-white">
              <Gift className="h-8 w-8 mb-2" />
              <span className="font-medium">Create Tip Link</span>
              <span className="text-xs opacity-90">Let supporters tip you</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col p-6">
              <Calendar className="h-8 w-8 mb-2" />
              <span className="font-medium">Schedule Content</span>
              <span className="text-xs text-gray-500">Plan your releases</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col p-6">
              <Users className="h-8 w-8 mb-2" />
              <span className="font-medium">Engage Supporters</span>
              <span className="text-xs text-gray-500">Send thank you messages</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorDashboard;
