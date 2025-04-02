
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseVideo = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  
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
      dueDate: "2023-09-10"
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
    navigate(`/student-assignments?id=${topic.assignment.id}`);
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
          <Button variant="outline" onClick={handleAssignment}>
            <FileText size={16} className="mr-2" />
            View Assignment
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
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
    </div>
  );
};

export default CourseVideo;
