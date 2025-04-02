
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TopicViewerProps {
  classroomId: string;
  topicId: string;
}

const TopicViewer: React.FC<TopicViewerProps> = ({ classroomId, topicId }) => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  
  // Mock topic data
  const topic = {
    id: topicId,
    title: "Design Thinking Process",
    description: "Learn the five stages of the design thinking process and how to apply them.",
    videoUrl: "https://example.com/videos/design-thinking.mp4",
    instructor: "Thomas Anderson",
    duration: "18 min",
    attachments: [
      { id: "att-1", name: "Design Thinking Worksheet", type: "pdf" },
      { id: "att-2", name: "Example Projects", type: "zip" }
    ],
    assignment: {
      id: "assignment-1",
      title: "Create a Design Thinking Process Map",
      description: "Apply the design thinking process to solve a real-world problem.",
      dueDate: "2023-09-15"
    }
  };
  
  const handleComplete = () => {
    setCompleted(true);
    // In a real app, you would save this to the backend
  };
  
  const handleBack = () => {
    navigate(`/student-classroom/${classroomId}`);
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
          Back to Classroom
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
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
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
        
        <TabsContent value="discussion">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium">Join the Discussion</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ask questions and share your thoughts</p>
                  <Button>Start Discussion</Button>
                </div>
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
      </Tabs>
    </div>
  );
};

export default TopicViewer;
