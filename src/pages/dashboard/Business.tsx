
import React, { useState } from "react";
import { Building, MapPin, Phone, Mail, Globe, Upload, FileText, Download, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import EditBusinessForm from "@/components/dashboard/EditBusinessForm";
import ApprovalStatus from "@/components/dashboard/ApprovalStatus";
import DocumentViewer from "@/components/dashboard/DocumentViewer";

interface BusinessInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  supportEmail: string;
  description: string;
  registrationNumber: string;
  registrationType: string;
  size: string;
  type: string;
  approvalStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

interface Document {
  id: string;
  name: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  file: string;
  type: string;
  size?: string;
  uploadedBy?: string;
}

interface Director {
  id: string;
  name: string;
  email: string;
  phone: string;
  idDocument?: string;
}

const Business = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
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
  });

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Certificate Of Incorporation",
      uploadDate: "2024-07-03",
      status: "approved",
      file: "certificate_incorporation.pdf",
      type: "incorporation",
      size: "2.3 MB",
      uploadedBy: "Imali2024"
    },
    {
      id: "2",
      name: "Signed Merchant Agreement", 
      uploadDate: "2024-07-03",
      status: "approved",
      file: "merchant_agreement.pdf",
      type: "agreement",
      size: "1.8 MB",
      uploadedBy: "Imali2024"
    },
    {
      id: "3",
      name: "Bank Statement",
      uploadDate: "2024-07-15",
      status: "pending",
      file: "bank_statement.pdf",
      type: "financial",
      size: "3.1 MB",
      uploadedBy: "webster"
    }
  ]);

  const [directors] = useState<Director[]>([
    {
      id: "1",
      name: "Musawenkosi Mkandla",
      email: "musa@initialize.co.zw",
      phone: "+263778289172",
      idDocument: "id_mkandla.pdf"
    },
    {
      id: "2",
      name: "Mihlayifani N Nyoni", 
      email: "nicholas@initialize.co.zw",
      phone: "+263789856057",
      idDocument: "id_nyoni.pdf"
    },
    {
      id: "3",
      name: "Adonis M Mhlanga",
      email: "adonis@initialize.co.zw", 
      phone: "+263779707983",
      idDocument: "id_mhlanga.pdf"
    }
  ]);

  const handleBusinessUpdate = (updatedInfo: BusinessInfo) => {
    setBusinessInfo(updatedInfo);
    toast.success("Business information updated. Changes will be reviewed by our team.");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        status: "pending",
        file: file.name,
        type: "other",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedBy: "Current User"
      };
      setDocuments(prev => [...prev, newDocument]);
      toast.success(`${file.name} uploaded successfully`);
    }
  };

  const handleDocumentDelete = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast.success("Document deleted successfully");
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">My Business</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your business information and documents
          </p>
        </div>
        <EditBusinessForm 
          businessInfo={businessInfo}
          onSave={handleBusinessUpdate}
        />
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

        {/* Enhanced Approval Status */}
        <ApprovalStatus
          currentStage={businessInfo.approvalStatus}
          submissionDate={businessInfo.createdDate}
          reviewDate="2024-07-04 09:30:00"
          approvalDate={businessInfo.approvalStatus === "APPROVED" ? businessInfo.lastModifiedDate : undefined}
        />
      </div>

      {/* Enhanced Company Documents */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Company Documents</CardTitle>
              <CardDescription>Upload and manage your business documents</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Document
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Uploaded: {doc.uploadDate}</span>
                      {doc.size && <span>• {doc.size}</span>}
                      {doc.uploadedBy && <span>• by {doc.uploadedBy}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={getStatusBadgeVariant(doc.status)}
                    className={doc.status === "approved" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {doc.status.toUpperCase()}
                  </Badge>
                  <div className="flex gap-1">
                    <DocumentViewer
                      documentName={doc.name}
                      documentType={doc.type}
                    />
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDocumentDelete(doc.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredDocuments.length === 0 && searchTerm && (
              <div className="text-center py-8 text-gray-500">
                No documents found matching "{searchTerm}"
              </div>
            )}
            
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
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
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
            {directors.map((director) => (
              <div key={director.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{director.name}</h4>
                  <p className="text-sm text-gray-500">{director.email}</p>
                  <p className="text-sm text-gray-500">{director.phone}</p>
                </div>
                <div className="flex gap-2">
                  {director.idDocument && (
                    <DocumentViewer
                      documentName={`ID Document - ${director.name}`}
                      documentType="identification"
                    />
                  )}
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Business;
