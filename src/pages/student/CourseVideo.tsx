
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, FileText, MessageSquare, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmitAssignmentModal from "@/components/student/assignments/SubmitAssignmentModal";

const CourseVideo = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  // Mock topic data
  const topic = {
    id: topicId,
    title: "UI vs UX: Understanding the Difference",
    description: "Learn about user interface design vs user experience design and how they work together.",
    videoUrl: "https://example.com/videos/ui-vs-ux.mp4",
    instructor: "Thomas Anderson",
    duration: "15 min",
    attachments: [
      { id: "att-1", name: "UI/UX Cheat Sheet", type: "pdf" },
      { id: "att-2", name: "Example Projects", type: "zip" }
    ],
    assignment: {
      id: "assignment-1",
      title: "Compare UI and UX in an Existing Product",
      description: "Analyze and document the UI and UX elements of a digital product of your choice.",
      dueDate: "2023-09-10",
      status: "pending" // Added status
    }
  };
  
  const handleComplete = () => {
    setCompleted(true);
    // In a real app, you would save this to the backend
  };
  
  const handleBack = () => {
    navigate(`/student-courses`);
  };
  
  const handleDownload = (attachmentId: string) => {
    console.log("Downloading attachment:", attachmentId);
  };
  
  const handleAssignment = () => {
    // Open submit modal instead of navigating
    setIsSubmitModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsSubmitModalOpen(false);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Course
        </Button>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">{topic.title}</h1>
        <p className="text-muted-foreground">{topic.description}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <span>Instructor: {topic.instructor}</span>
          <span>•</span>
          <span>{topic.duration}</span>
          <span>•</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">Student Content</span>
        </div>
      </div>
      
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        {/* In a real app, this would be an actual video player */}
        <div className="text-white">Video Player: {topic.title}</div>
      </div>
      
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {completed ? (
            <div className="flex items-center text-green-500">
              <CheckCircle size={20} className="mr-1" />
              Completed
            </div>
          ) : (
            <Button onClick={handleComplete}>Mark as Completed</Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {topic.assignment && (
            <Button onClick={handleAssignment}>
              <Upload size={16} className="mr-2" />
              Submit Assignment
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Attachments</h3>
              <div className="space-y-2">
                {topic.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <span>{attachment.name}</span>
                      <span className="text-xs uppercase text-muted-foreground">({attachment.type})</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownload(attachment.id)}
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Your Notes</h3>
              <textarea 
                className="w-full min-h-[200px] p-3 border rounded-md"
                placeholder="Type your notes here..."
              ></textarea>
              <div className="flex justify-end mt-4">
                <Button>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignment">
          {topic.assignment ? (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">{topic.assignment.title}</h3>
                <p className="text-sm mb-4">{topic.assignment.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    Due: {topic.assignment.dueDate}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    topic.assignment.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                    topic.assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {topic.assignment.status.charAt(0).toUpperCase() + topic.assignment.status.slice(1)}
                  </span>
                </div>
                <Button 
                  className="w-full sm:w-auto" 
                  onClick={handleAssignment}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Assignment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">No assignment for this video.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="transcript">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Video Transcript</h3>
              <div className="p-4 bg-secondary/30 rounded-md max-h-[300px] overflow-y-auto">
                <p className="text-sm">
                  Welcome to this lesson on UI versus UX design. In this video, we'll cover the key differences between user interface design and user experience design, and how they work together to create effective digital products.
                </p>
                <p className="text-sm mt-2">
                  User Interface, or UI design, focuses on the visual elements that users interact with. This includes buttons, icons, spacing, typography, color schemes, and overall visual style. A good UI designer ensures that every visual element feels cohesive and serves a clear purpose.
                </p>
                <p className="text-sm mt-2">
                  On the other hand, User Experience, or UX design, is concerned with the overall feel of the experience. UX designers focus on understanding the user's journey, their needs, and pain points. They work to ensure the product is intuitive, accessible, and enjoyable to use.
                </p>
                {/* Further transcript content would go here in a real implementation */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {topic.assignment && (
        <SubmitAssignmentModal
          isOpen={isSubmitModalOpen}
          onClose={handleCloseModal}
          assignmentId={topic.assignment.id}
          assignmentTitle={topic.assignment.title}
          submissionType="file_upload"
        />
      )}
    </div>
  );
};

export default CourseVideo;
