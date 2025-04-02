
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserRound, Calendar, BookOpen, Video, FileText, Clock } from "lucide-react";

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
  },
];

// Mock data for available classrooms
const availableClassrooms = [
  {
    id: 3,
    title: "Advanced Prototyping Techniques",
    instructorName: "Michael Rodriguez",
    studentsCount: 18,
    startDate: "September 15, 2023",
    duration: "8 weeks",
  },
  {
    id: 4,
    title: "User Research Methods",
    instructorName: "Sophia Williams",
    studentsCount: 24,
    startDate: "October 5, 2023",
    duration: "6 weeks",
  },
];

const StudentClassrooms = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Classrooms</h1>
        <p className="text-muted-foreground">Explore your current classrooms and join new ones</p>
      </div>

      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="enrolled">My Classrooms</TabsTrigger>
          <TabsTrigger value="available">Available Classrooms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-6">
          {classrooms.map((classroom) => (
            <Card key={classroom.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{classroom.title}</CardTitle>
                    <CardDescription>Instructor: {classroom.instructorName}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {classroom.completedModules}/{classroom.moduleCount} Modules
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(classroom.completedModules / classroom.moduleCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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

                <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors mt-4">
                  Enter Classroom
                </button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableClassrooms.map((classroom) => (
              <Card key={classroom.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{classroom.title}</CardTitle>
                  <CardDescription>Instructor: {classroom.instructorName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <UserRound size={16} className="text-muted-foreground" />
                      <span className="text-sm">{classroom.studentsCount} students enrolled</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-muted-foreground" />
                        <span className="text-sm">Starts: {classroom.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span className="text-sm">Duration: {classroom.duration}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">
                      Join Classroom
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentClassrooms;
