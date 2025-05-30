
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface ApprovalStatusProps {
  currentStage: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  submissionDate?: string;
  reviewDate?: string;
  approvalDate?: string;
  rejectionReason?: string;
}

const ApprovalStatus: React.FC<ApprovalStatusProps> = ({
  currentStage,
  submissionDate,
  reviewDate,
  approvalDate,
  rejectionReason
}) => {
  const stages = [
    {
      id: "PENDING",
      title: "Application Submitted",
      description: "Your application has been received and is in queue for review",
      icon: Clock,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      id: "UNDER_REVIEW",
      title: "Under Review",
      description: "Our team is reviewing your business information and documents",
      icon: AlertCircle,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      id: "APPROVED",
      title: "Approved",
      description: "Your business has been verified and approved for all features",
      icon: CheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    }
  ];

  const getCurrentStageIndex = () => {
    if (currentStage === "REJECTED") return -1;
    return stages.findIndex(stage => stage.id === currentStage);
  };

  const isStageCompleted = (stageIndex: number) => {
    const currentIndex = getCurrentStageIndex();
    return currentIndex > stageIndex || (currentIndex === stageIndex && currentStage === "APPROVED");
  };

  const isCurrentStage = (stageIndex: number) => {
    return getCurrentStageIndex() === stageIndex;
  };

  if (currentStage === "REJECTED") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Application Rejected
          </CardTitle>
          <CardDescription>Your business application requires attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 font-medium mb-2">Rejection Reason:</p>
            <p className="text-red-700 dark:text-red-300 text-sm">
              {rejectionReason || "Please contact support for more information about the rejection."}
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>Review Date: {reviewDate || "N/A"}</p>
            <p className="mt-1">You can edit your business information and resubmit for review.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Verification Status</CardTitle>
        <CardDescription>Track your business approval progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const completed = isStageCompleted(index);
            const current = isCurrentStage(index);
            
            return (
              <div key={stage.id} className="flex items-start gap-4">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${completed 
                    ? `${stage.color} border-transparent text-white` 
                    : current 
                      ? `border-current ${stage.textColor} ${stage.bgColor}` 
                      : 'border-gray-300 dark:border-gray-600 text-gray-400'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${
                      completed || current 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {stage.title}
                    </h4>
                    {completed && (
                      <Badge className="bg-green-600 text-white">Completed</Badge>
                    )}
                    {current && !completed && (
                      <Badge variant="outline" className={stage.textColor}>
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {stage.description}
                  </p>
                  {stage.id === "PENDING" && submissionDate && (
                    <p className="text-xs text-gray-400">Submitted: {submissionDate}</p>
                  )}
                  {stage.id === "UNDER_REVIEW" && reviewDate && current && (
                    <p className="text-xs text-gray-400">Review started: {reviewDate}</p>
                  )}
                  {stage.id === "APPROVED" && approvalDate && completed && (
                    <p className="text-xs text-gray-400">Approved: {approvalDate}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> All approvals are processed by our Super Admin team. 
            You will receive email notifications at each stage of the review process.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalStatus;
