
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  ExternalLink,
  Download,
  Upload,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import SubmitAssignmentModal from "@/components/student/assignments/SubmitAssignmentModal";

const StudentAssignmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Mock data for assignment details - in a real app, this would be fetched from an API
  const assignment = {
    id: id || "1",
    title: "Design Principles Analysis",
    course: "UI/UX Design Fundamentals",
    classroom: "UI Design Workshop",
    description: "Analyze the design principles used in three different mobile applications and prepare a detailed report on your findings. Your analysis should include examples of how each principle is applied, and your assessment of its effectiveness.",
    dueDate: "2023-10-15T23:59:59",
    submissionDate: "2023-10-10T14:35:00",
    status: "submitted", // can be 'pending', 'submitted', 'graded', 'overdue'
    grade: "A",
    maxPoints: 100,
    earnedPoints: 92,
    progress: 100,
    feedback: "Excellent analysis of design principles. Your understanding of visual hierarchy and color theory is impressive. Consider exploring more on consistency and accessibility in future assignments.",
    attachments: [
      { id: "att1", name: "Assignment Guidelines.pdf", size: "1.2 MB", type: "pdf" },
      { id: "att2", name: "Example Report.docx", size: "850 KB", type: "docx" },
    ],
    submissions: [
      { id: "sub1", name: "My Submission.pdf", date: "2023-10-10T14:35:00", size: "3.4 MB" },
    ],
    rubric: [
      { name: "Analysis Depth", score: 25, maxScore: 25 },
      { name: "Examples Provided", score: 24, maxScore: 25 },
      { name: "Writing Quality", score: 22, maxScore: 25 },
      { name: "Visual Presentation", score: 21, maxScore: 25 },
    ]
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `${diffDays} days remaining`;
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "submitted":
        return "outline" as const;
      case "graded":
        return "outline" as const;
      case "overdue":
        return "destructive" as const;
      default:
        return "default" as const;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-600";
      case "graded":
        return "bg-blue-100 text-blue-600";
      default:
        return "";
    }
  };
  
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "submitted":
        return "Submitted";
      case "graded":
        return "Graded";
      case "overdue":
        return "Overdue";
      default:
        return "Pending";
    }
  };

  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const handleCloseSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{assignment.title}</h1>
          <p className="text-muted-foreground">{assignment.course} • {assignment.classroom}</p>
        </div>
        <Badge 
          variant={getStatusBadgeVariant(assignment.status)}
          className={getStatusBadgeClass(assignment.status)}
        >
          {getStatusDisplay(assignment.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{assignment.description}</p>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Attachments</h3>
                <div className="space-y-2">
                  {assignment.attachments.map(attachment => (
                    <div 
                      key={attachment.id}
                      className="flex items-center justify-between p-2 bg-secondary/20 rounded-md"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>{attachment.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">({attachment.size})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {assignment.status === 'submitted' || assignment.status === 'graded' ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Submission</CardTitle>
                {assignment.submissionDate && (
                  <CardDescription>
                    Submitted on {formatDate(assignment.submissionDate)} at {formatTime(assignment.submissionDate)}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {assignment.submissions.map(submission => (
                    <div 
                      key={submission.id}
                      className="flex items-center justify-between p-2 bg-secondary/20 rounded-md"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>{submission.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">({submission.size})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              {assignment.status !== 'graded' && (
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleOpenSubmitModal}
                  >
                    Re-submit Assignment
                    <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Assignment</CardTitle>
                <CardDescription>
                  Upload your completed work before the deadline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-8 border-2 border-dashed border-primary/20 rounded-md text-center cursor-pointer"
                  onClick={handleOpenSubmitModal}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Drag and drop files here, or click to browse</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleOpenSubmitModal}
                >
                  Submit Assignment
                  <Upload className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Due Date</span>
                </div>
                <span>{formatDate(assignment.dueDate)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Time</span>
                </div>
                <span>{formatTime(assignment.dueDate)}</span>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Status</span>
                  <span className="text-sm font-medium">{assignment.progress}%</span>
                </div>
                <Progress value={assignment.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {(assignment.status === 'graded') && (
            <Card>
              <CardHeader>
                <CardTitle>Feedback & Grade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{assignment.grade}</div>
                      <div className="text-xs text-green-600">{assignment.earnedPoints}/{assignment.maxPoints}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Rubric</h3>
                  {assignment.rubric.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>{item.score}/{item.maxScore}</span>
                      </div>
                      <div className="w-full bg-secondary h-1.5 rounded-full">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-secondary/30 rounded-md">
                  <h3 className="font-medium mb-2">Instructor Comments</h3>
                  <p className="text-sm">{assignment.feedback}</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {assignment.status === 'pending' && (
            <Button 
              className="w-full"
              onClick={handleOpenSubmitModal}
            >
              Submit Assignment
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <SubmitAssignmentModal
        isOpen={isSubmitModalOpen}
        onClose={handleCloseSubmitModal}
        assignmentId={assignment.id.toString()}
        assignmentTitle={assignment.title}
        submissionType="file_upload"
      />
    </div>
  );
};

export default StudentAssignmentDetails;
