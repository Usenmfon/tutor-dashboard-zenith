
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  UserRound, 
  Calendar, 
  BookOpen, 
  Video, 
  FileText, 
  Clock, 
  MessageSquare,
  Users,
  Bell
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for student classrooms
const classrooms = [
  {
    id: 1,
    title: "UI/UX Design Workshop",
    instructorName: "Thomas Anderson",
    studentsCount: 28,
    moduleCount: 6,
    completedModules: 4,
    nextSession: "Tomorrow, 3:00 PM",
    assignments: 3,
    completedAssignments: 1,
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Design Systems Fundamentals",
    instructorName: "Emily Chen",
    studentsCount: 22,
    moduleCount: 8,
    completedModules: 2,
    nextSession: "Thursday, 5:00 PM",
    assignments: 4,
    completedAssignments: 1,
    coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
];

// Mock data for upcoming classrooms
const upcomingClassrooms = [
  {
    id: 3,
    title: "Advanced Prototyping Techniques",
    instructorName: "Michael Rodriguez",
    studentsCount: 18,
    startDate: "September 15, 2023",
    duration: "8 weeks",
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    title: "User Research Methods",
    instructorName: "Sophia Williams",
    studentsCount: 24,
    startDate: "October 5, 2023",
    duration: "6 weeks",
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
];

const StudentClassrooms = () => {
  const navigate = useNavigate();

  const handleEnterClassroom = (classroomId: number) => {
    navigate(`/student-classroom/${classroomId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Classrooms</h1>
        <p className="text-muted-foreground">Explore your current classrooms and join upcoming ones</p>
      </div>

      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="enrolled">My Classrooms</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Classrooms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <Card key={classroom.id} className="hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="h-40 bg-gray-200 relative overflow-hidden">
                  {classroom.coverImage && (
                    <img 
                      src={classroom.coverImage} 
                      alt={classroom.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-none">
                      {classroom.completedModules}/{classroom.moduleCount} Modules
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle>{classroom.title}</CardTitle>
                  <CardDescription>Instructor: {classroom.instructorName}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(classroom.completedModules / classroom.moduleCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="flex items-center gap-2">
                      <UserRound size={16} className="text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Students</p>
                        <p className="text-muted-foreground">{classroom.studentsCount} enrolled</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Next Session</p>
                        <p className="text-muted-foreground">{classroom.nextSession}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">Assignments</p>
                        <p className="text-muted-foreground">
                          {classroom.completedAssignments}/{classroom.assignments} completed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button 
                    className="w-full bg-primary text-primary-foreground"
                    onClick={() => handleEnterClassroom(classroom.id)}
                  >
                    Enter Classroom
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClassrooms.map((classroom) => (
              <Card key={classroom.id} className="hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="h-40 bg-gray-200 relative overflow-hidden">
                  {classroom.coverImage && (
                    <img 
                      src={classroom.coverImage} 
                      alt={classroom.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <Badge className="absolute top-3 right-3">
                    Upcoming
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle>{classroom.title}</CardTitle>
                  <CardDescription>Instructor: {classroom.instructorName}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      <span className="text-sm">{classroom.studentsCount} students enrolled</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span className="text-sm">Starts: {classroom.startDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span className="text-sm">Duration: {classroom.duration}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full">
                    Join Classroom
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentClassrooms;
