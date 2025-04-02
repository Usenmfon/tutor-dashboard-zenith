
import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Video, Users, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ClassroomEntryProps {
  classroomId: string;
}

const ClassroomEntry: React.FC<ClassroomEntryProps> = ({ classroomId }) => {
  const navigate = useNavigate();
  
  // Mock data for classroom details
  const classroom = {
    id: classroomId,
    title: "UI/UX Design Workshop",
    instructor: "Thomas Anderson",
    progress: 65,
    nextClass: "Tomorrow, 3:00 PM",
    modules: [
      {
        id: "module-1",
        title: "Introduction to UI/UX",
        progress: 100,
        topics: [
          { id: "topic-1", title: "UI vs UX", type: "video", completed: true, duration: "15 min" },
          { id: "topic-2", title: "Design Thinking", type: "video", completed: true, duration: "20 min" }
        ]
      },
      {
        id: "module-2",
        title: "User Research",
        progress: 50,
        topics: [
          { id: "topic-3", title: "Research Methods", type: "video", completed: true, duration: "25 min" },
          { id: "topic-4", title: "User Personas", type: "video", completed: false, duration: "18 min" }
        ]
      }
    ],
    assignments: [
      { id: "assignment-1", title: "Create a User Flow", due: "2023-09-10", status: "completed" },
      { id: "assignment-2", title: "Design a Mobile App Wireframe", due: "2023-09-15", status: "pending" }
    ],
    resources: [
      { id: "resource-1", title: "UI/UX Design Guidelines", type: "pdf" },
      { id: "resource-2", title: "Design System Templates", type: "zip" }
    ],
    students: 24
  };
  
  const handleAssignmentClick = (assignmentId: string) => {
    navigate(`/student-assignments?id=${assignmentId}`);
  };
  
  const handleResourceClick = (resourceId: string) => {
    // Download or view resource
    console.log("Opening resource:", resourceId);
  };
  
  const handleWatchVideo = (topicId: string) => {
    navigate(`/student-classroom/${classroomId}/topic/${topicId}`);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{classroom.title}</h1>
          <p className="text-muted-foreground">Instructor: {classroom.instructor}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users size={14} />
            {classroom.students} Students
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {classroom.progress}% Complete
          </Badge>
        </div>
      </div>
      
      <div className="w-full bg-secondary h-2 rounded-full">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${classroom.progress}%` }}
        ></div>
      </div>
      
      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <BookOpen size={16} />
            Modules
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <FileText size={16} />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="live-classes" className="flex items-center gap-2">
            <Video size={16} />
            Live Classes
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-box">
              <path d="M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.5Z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M9 10h6" />
              <path d="M9 14h6" />
              <path d="M9 18h6" />
            </svg>
            Resources
          </TabsTrigger>
        </TabsList>
        
        {/* Modules Tab */}
        <TabsContent value="modules" className="space-y-6">
          {classroom.modules.map((module) => (
            <Card key={module.id}>
              <CardHeader className="pb-2">
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.topics.length} topics</CardDescription>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.topics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${topic.completed ? 'bg-green-100 text-green-600' : 'bg-secondary'}`}>
                          <Video size={16} />
                        </div>
                        <div>
                          <p className="font-medium">{topic.title}</p>
                          <p className="text-xs text-muted-foreground">{topic.duration}</p>
                        </div>
                      </div>
                      <Button 
                        variant={topic.completed ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleWatchVideo(topic.id)}
                      >
                        {topic.completed ? "Rewatch" : "Watch Now"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Assignments Tab */}
        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Assignments</CardTitle>
              <CardDescription>All assignments for this classroom</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classroom.assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        <span>Due: {assignment.due}</span>
                      </div>
                    </div>
                    <Badge variant={assignment.status === "completed" ? "success" : "outline"}>
                      {assignment.status === "completed" ? "Completed" : "Pending"}
                    </Badge>
                    <Button 
                      onClick={() => handleAssignmentClick(assignment.id)}
                      variant="outline"
                      size="sm"
                    >
                      {assignment.status === "completed" ? "View Submission" : "Submit Assignment"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Live Classes Tab */}
        <TabsContent value="live-classes">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Live Classes</CardTitle>
              <CardDescription>Join interactive sessions with your instructor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Next Live Class</h3>
                <p className="text-muted-foreground mb-4">Tomorrow, 3:00 PM - Advanced Prototyping</p>
                <Button>Join When Available</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Course Resources</CardTitle>
              <CardDescription>Supplementary materials for your learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classroom.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" x2="8" y1="13" y2="13"/>
                          <line x1="16" x2="8" y1="17" y2="17"/>
                          <line x1="10" x2="8" y1="9" y2="9"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-xs text-muted-foreground uppercase">{resource.type} file</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleResourceClick(resource.id)}
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomEntry;
