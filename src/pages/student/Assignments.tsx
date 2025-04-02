
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, CheckCircle, AlertCircle, Search, FileText, Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Mock data for student assignments
const pendingAssignments = [
  {
    id: 1,
    title: "Design System Components",
    course: "UI/UX Design Fundamentals",
    dueDate: "2023-09-10T23:59:59",
    status: "pending",
    progress: 60,
  },
  {
    id: 2,
    title: "User Persona Development",
    course: "Design Systems",
    dueDate: "2023-09-15T23:59:59",
    status: "pending",
    progress: 30,
  },
];

const completedAssignments = [
  {
    id: 3,
    title: "Wireframing Exercise",
    course: "UI/UX Design Fundamentals",
    dueDate: "2023-08-28T23:59:59",
    submittedDate: "2023-08-27T14:35:00",
    status: "completed",
    grade: "A",
    feedback: "Excellent work on the wireframes. Your attention to detail is impressive."
  },
  {
    id: 4,
    title: "User Research Report",
    course: "Design Systems",
    dueDate: "2023-08-20T23:59:59",
    submittedDate: "2023-08-18T10:15:00",
    status: "completed",
    grade: "B+",
    feedback: "Good analysis but could use more depth in the research methodology."
  },
];

const StudentAssignments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  
  const filterAssignments = (assignments: any[]) => {
    return assignments.filter(assignment => 
      (assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       assignment.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (courseFilter === "all" || assignment.course === courseFilter)
    );
  };
  
  const filteredPending = filterAssignments(pendingAssignments);
  const filteredCompleted = filterAssignments(completedAssignments);
  
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
  
  const getStatusColor = (dueDate: string) => {
    const days = getDaysRemaining(dueDate);
    if (days === "Overdue") return "destructive";
    if (days === "Due today") return "warning";
    return "secondary";
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Assignments</h1>
        <p className="text-muted-foreground">View and manage your course assignments</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="UI/UX Design Fundamentals">UI/UX Design Fundamentals</SelectItem>
            <SelectItem value="Design Systems">Design Systems</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending ({filteredPending.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filteredCompleted.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-6">
          {filteredPending.length > 0 ? (
            filteredPending.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>{assignment.course}</CardDescription>
                    </div>
                    <Badge variant={getStatusColor(assignment.dueDate) as any}>
                      {getDaysRemaining(assignment.dueDate)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Your progress</span>
                      <span className="text-sm">{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>Due: {formatDate(assignment.dueDate)} at {formatTime(assignment.dueDate)}</span>
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" className="w-full md:w-auto">
                        View Details
                      </Button>
                      <Button className="w-full md:w-auto">
                        Continue Work
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No pending assignments found</h3>
              <p className="text-muted-foreground">
                {searchTerm || courseFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "You're all caught up! Check the completed tab to view your past work."}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          {filteredCompleted.length > 0 ? (
            filteredCompleted.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>{assignment.course}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="font-medium">Grade: {assignment.grade}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="p-3 bg-secondary/50 rounded-md">
                      <p className="text-sm font-medium mb-1">Instructor Feedback:</p>
                      <p className="text-sm">{assignment.feedback}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>Due: {formatDate(assignment.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle size={14} className="text-green-500" />
                        <span>Submitted: {formatDate(assignment.submittedDate)}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      View Submission
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No completed assignments found</h3>
              <p className="text-muted-foreground">
                {searchTerm || courseFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "You haven't completed any assignments yet."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAssignments;
