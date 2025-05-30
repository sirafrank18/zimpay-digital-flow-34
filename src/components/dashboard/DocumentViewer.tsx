
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Download, FileText } from "lucide-react";

interface DocumentViewerProps {
  documentName: string;
  documentUrl?: string;
  documentType?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  documentName, 
  documentUrl, 
  documentType = "pdf" 
}) => {
  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${documentName}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {documentName}
          </DialogTitle>
          <DialogDescription>
            Document preview - Click download to save a copy
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          {documentUrl ? (
            <iframe
              src={documentUrl}
              className="w-full h-full rounded-lg"
              title={documentName}
            />
          ) : (
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Document preview not available
              </p>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Document
              </Button>
            </div>
          )}
        </div>
        {documentUrl && (
          <div className="flex justify-end">
            <Button onClick={handleDownload} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
