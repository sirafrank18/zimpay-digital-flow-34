
import React, { useState } from "react";
import { Building, MapPin, Phone, Mail, Globe, Edit2, Upload, FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Business = () => {
  const [documents, setDocuments] = useState([
    {
      name: "Certificate Of Incorporation",
      uploadDate: "2024-07-03",
      status: "approved",
      file: "certificate_incorporation.pdf"
    },
    {
      name: "Signed Merchant Agreement", 
      uploadDate: "2024-07-03",
      status: "approved",
      file: "merchant_agreement.pdf"
    }
  ]);

  const handleFileUpload = (documentType: string) => {
    toast.success(`${documentType} uploaded successfully`);
  };

  const businessInfo = {
    name: "SoluGrowth FinTech",
    address: "Office 14 Salaamat Building Corner G.Silundika and 9th Avenue Bulawayo",
    email: "hello@imali.co.zw",
    phone: "+263779707983",
    website: "www.imali.co.zw and www.initialize.co.zw",
    supportEmail: "hello@initialize.co.zw",
    description: "FinTech Products and Services, Bill and Merchant payments",
    registrationNumber: "3592/2023",
    registrationType: "Private Business Corporation",
    size: "LESS_THAN_50",
    type: "REGISTERED_BUSINESS",
    approvalStatus: "APPROVED",
    createdBy: "Imali2024",
    createdDate: "2024-07-03 21:22:22",
    lastModifiedBy: "webster",
    lastModifiedDate: "2024-07-03 22:52:28"
  };

  const directors = [
    {
      name: "Musawenkosi Mkandla",
      email: "musa@initialize.co.zw",
      phone: "+263778289172"
    },
    {
      name: "Mihlayifani N Nyoni", 
      email: "nicholas@initialize.co.zw",
      phone: "+263789856057"
    },
    {
      name: "Adonis M Mhlanga",
      email: "adonis@initialize.co.zw", 
      phone: "+263779707983"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">My Business</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your business information and documents
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 flex items-center gap-2"
          variant="outline"
        >
          <Edit2 className="h-4 w-4" />
          Edit Business
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Your company details and registration info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{businessInfo.name}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span className="text-sm">{businessInfo.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{businessInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{businessInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{businessInfo.website}</span>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Registration Number:</span>
                <span className="font-medium">{businessInfo.registrationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Registration Type:</span>
                <span>{businessInfo.registrationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Business Size:</span>
                <span>{businessInfo.size}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Your account verification and approval status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <Badge className="bg-green-600 text-white mb-2">{businessInfo.approvalStatus}</Badge>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Verified Business</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Your account has been fully verified and is eligible for all features
              </p>
              <div className="mt-4 space-y-1 text-xs text-gray-500">
                <p>Created: {businessInfo.createdDate}</p>
                <p>Last Modified: {businessInfo.lastModifiedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Company Documents</CardTitle>
          <CardDescription>Upload and manage your business documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={doc.status === "approved" ? "default" : "outline"} 
                         className={doc.status === "approved" ? "bg-green-600" : ""}>
                    {doc.status.toUpperCase()}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Upload New Document */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h4 className="font-medium mb-2">Upload Additional Documents</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="sr-only">Choose file</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0]?.name || "")}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Directors Information */}
      <Card>
        <CardHeader>
          <CardTitle>Directors</CardTitle>
          <CardDescription>Company directors and their contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {directors.map((director, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{director.name}</h4>
                  <p className="text-sm text-gray-500">{director.email}</p>
                  <p className="text-sm text-gray-500">{director.phone}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View ID Evidence
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Business;
