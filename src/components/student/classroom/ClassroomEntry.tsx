
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  BookOpen,
  FileText,
  ClipboardList,
  BarChart2,
  Megaphone,
  CalendarDays,
  CheckCircle,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface ClassroomEntryProps {
  classroomId: string;
}

const ClassroomEntry: React.FC<ClassroomEntryProps> = ({ classroomId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("modules");

  // Mock data for classroom details
  const classroom = {
    id: classroomId,
    name: "UI Design Fundamentals",
    description: "A comprehensive introduction to UI design principles and practices.",
    instructor: "Thomas Anderson",
    instructorRole: "Lead Tutor",
    instructorImage: "https://i.pravatar.cc/150?img=33",
    startDate: "2023-08-15",
    endDate: "2023-12-15",
    moduleCount: 6,
    completedModules: 4,
    progress: 68,
    studentCount: 24,
    nextSession: "Tomorrow, 3:00 PM",
    modules: [
      {
        id: "mod-1",
        title: "Introduction to UI Design",
        topics: [
          { id: "top-1", title: "Design Principles", completed: true, type: "video" },
          { id: "top-2", title: "UI Elements", completed: true, type: "pdf" },
          { id: "top-3", title: "Color Theory", completed: false, type: "video" },
        ],
        progress: 75
      },
      {
        id: "mod-2",
        title: "Layout & Composition",
        topics: [
          { id: "top-4", title: "Grid Systems", completed: false, type: "video" },
          { id: "top-5", title: "Responsive Design", completed: false, type: "video" },
        ],
        progress: 0
      }
    ],
    assignments: [
      {
        id: "asgn-1",
        title: "Design Principles Analysis",
        dueDate: "2023-09-20",
        status: "submitted",
        grade: "A",
        feedback: "Excellent analysis of design principles."
      },
      {
        id: "asgn-2",
        title: "UI Components Creation",
        dueDate: "2023-10-05",
        status: "pending",
        submissionLink: "https://forms.example.com/submit"
      }
    ],
    announcements: [
      {
        id: "ann-1",
        title: "Welcome to the class!",
        content: "Welcome to UI Design Fundamentals. Please review the syllabus and prepare for our first session.",
        date: "2023-08-14",
        author: "Thomas Anderson"
      },
      {
        id: "ann-2",
        title: "Assignment Deadline Extended",
        content: "The deadline for the UI Components Creation assignment has been extended to October 5th.",
        date: "2023-09-25",
        author: "Thomas Anderson"
      }
    ],
    students: [
      { id: "std-1", name: "Emily Johnson", image: "https://i.pravatar.cc/150?img=1" },
      { id: "std-2", name: "Michael Chen", image: "https://i.pravatar.cc/150?img=2" },
      { id: "std-3", name: "Sara Williams", image: "https://i.pravatar.cc/150?img=3" },
      { id: "std-4", name: "David Kim", image: "https://i.pravatar.cc/150?img=4" },
    ],
    feeds: [
      {
        id: "feed-1", 
        content: "Class materials for today's session have been uploaded.",
        author: "Thomas Anderson",
        authorRole: "Instructor",
        date: "2 hours ago",
        type: "announcement"
      },
      {
        id: "feed-2", 
        content: "Has anyone started on the UI Components assignment?",
        author: "Emily Johnson",
        authorRole: "Student",
        date: "Yesterday",
        type: "question"
      },
      {
        id: "feed-3", 
        content: "Great session today! Looking forward to the next one.",
        author: "Michael Chen",
        authorRole: "Student",
        date: "2 days ago",
        type: "comment"
      }
    ]
  };

  const handleViewTopic = (topicId: string) => {
    navigate(`/student-classroom/${classroomId}/topic/${topicId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="pl-0"
          onClick={() => navigate("/student-classrooms")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Classrooms
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-2xl">{classroom.name}</CardTitle>
              <CardDescription className="mt-1">{classroom.description}</CardDescription>
              
              <div className="flex items-center mt-2">
                <Avatar className="h-8 w-8 mr-2">
                  <img src={classroom.instructorImage} alt={classroom.instructor} />
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{classroom.instructor}</p>
                  <p className="text-xs text-muted-foreground">{classroom.instructorRole}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Progress: {classroom.progress}%
              </Badge>
              <div className="text-sm text-muted-foreground">
                Next Session: {classroom.nextSession}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <Progress value={classroom.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">Start Date</div>
              <div>{classroom.startDate}</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">End Date</div>
              <div>{classroom.endDate}</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">Students</div>
              <div>{classroom.studentCount}</div>
            </div>
            <div className="bg-muted/20 p-4 rounded-md">
              <div className="font-medium">Modules</div>
              <div>{classroom.completedModules}/{classroom.moduleCount} Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="modules" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Modules
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center">
            <ClipboardList className="mr-2 h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="feed" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Class Feed
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center">
            <Megaphone className="mr-2 h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          {classroom.modules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.topics.length} topics</CardDescription>
                  </div>
                  <Badge variant="outline" className={module.progress === 100 ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"}>
                    {module.progress}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Progress value={module.progress} className="h-2" />
                </div>
                <div className="space-y-3">
                  {module.topics.map((topic) => (
                    <div 
                      key={topic.id} 
                      className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${topic.completed ? 'bg-green-100 text-green-600' : 'bg-secondary'}`}>
                          {topic.completed ? <CheckCircle size={16} /> : topic.type === 'video' ? <Video size={16} /> : <FileText size={16} />}
                        </div>
                        <div>
                          <p className="font-medium">{topic.title}</p>
                          <p className="text-xs text-muted-foreground">{topic.type === 'video' ? 'Video' : 'Document'}</p>
                        </div>
                      </div>
                      <Button 
                        variant={topic.completed ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleViewTopic(topic.id)}
                      >
                        {topic.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          {classroom.assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>Due: {assignment.dueDate}</CardDescription>
                  </div>
                  <Badge 
                    variant={assignment.status === 'submitted' ? 'outline' : 'default'}
                    className={
                      assignment.status === 'submitted' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-amber-100 text-amber-600'
                    }
                  >
                    {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {assignment.status === 'submitted' ? (
                  <div className="space-y-4">
                    <div className="bg-muted/20 p-4 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Grade</p>
                          <p className="text-2xl font-bold">{assignment.grade}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Feedback</p>
                          <p className="text-sm">{assignment.feedback}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Submission
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm">
                      Complete this assignment and submit it before the due date.
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(assignment.submissionLink, '_blank')}
                    >
                      Submit Assignment
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Classmates</CardTitle>
                <CardDescription>Students enrolled in this classroom</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {classroom.students.map((student) => (
                    <div key={student.id} className="flex items-center gap-3 p-2 rounded-md">
                      <Avatar className="h-10 w-10">
                        <img src={student.image} alt={student.name} />
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Class Feed</CardTitle>
              <CardDescription>Recent activity in this classroom</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classroom.feeds.map((feed) => (
                  <div 
                    key={feed.id} 
                    className="border-b border-border/50 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feed.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {feed.authorRole}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{feed.date}</span>
                    </div>
                    <p className="text-sm">{feed.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <div className="space-y-4">
            {classroom.announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">{announcement.date}</span>
                  </div>
                  <CardDescription>by {announcement.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomEntry;
