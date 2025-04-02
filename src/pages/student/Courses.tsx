
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Calendar, BookOpen, Video, FileText, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for student courses
const enrolledCourses = [
  {
    id: 1,
    title: "UI/UX Design Fundamentals",
    progress: 65,
    moduleCount: 8,
    completedModules: 5,
    instructor: "Thomas Anderson",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    modules: [
      {
        id: "module-1",
        title: "Introduction to UI/UX",
        progress: 100,
        topics: [
          { id: "topic-1", title: "UI vs UX", type: "video", completed: true, duration: "15 min" },
          { id: "topic-2", title: "Design Thinking", type: "video", completed: true, duration: "20 min" },
          { id: "topic-3", title: "User-Centered Design", type: "video", completed: true, duration: "18 min" }
        ]
      },
      {
        id: "module-2",
        title: "User Research",
        progress: 50,
        topics: [
          { id: "topic-4", title: "Research Methods", type: "video", completed: true, duration: "25 min" },
          { id: "topic-5", title: "User Personas", type: "video", completed: false, duration: "18 min" },
          { id: "topic-6", title: "User Journey Mapping", type: "video", completed: false, duration: "22 min" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Design Systems",
    progress: 30,
    moduleCount: 6,
    completedModules: 2,
    instructor: "Emily Chen",
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    modules: [
      {
        id: "module-3",
        title: "Design System Basics",
        progress: 100,
        topics: [
          { id: "topic-7", title: "What is a Design System", type: "video", completed: true, duration: "15 min" },
          { id: "topic-8", title: "Benefits of Design Systems", type: "video", completed: true, duration: "12 min" }
        ]
      },
      {
        id: "module-4",
        title: "Component Libraries",
        progress: 25,
        topics: [
          { id: "topic-9", title: "Atomic Design", type: "video", completed: true, duration: "20 min" },
          { id: "topic-10", title: "Building Components", type: "video", completed: false, duration: "25 min" },
          { id: "topic-11", title: "Documentation", type: "video", completed: false, duration: "18 min" },
          { id: "topic-12", title: "Implementation", type: "video", completed: false, duration: "22 min" }
        ]
      }
    ]
  }
];

const availableCourses = [
  {
    id: 3,
    title: "User Research Methods",
    duration: "8 weeks",
    instructor: "Michael Rodriguez",
    description: "Learn comprehensive methods for conducting effective user research.",
    startDate: "September 15, 2023",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    title: "Interactive Prototyping with Figma",
    duration: "6 weeks",
    instructor: "Sophia Williams",
    description: "Master advanced prototyping techniques using Figma.",
    startDate: "October 5, 2023",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
];

const StudentCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  
  const handleCourseSelect = (courseId: number) => {
    setSelectedCourse(courseId === selectedCourse ? null : courseId);
    setExpandedModule(null);
  };
  
  const handleModuleToggle = (moduleId: string) => {
    setExpandedModule(moduleId === expandedModule ? null : moduleId);
  };
  
  const handleWatchVideo = (courseId: number, topicId: string) => {
    // In a real app, this would navigate to the video player page
    console.log(`Watch video: Course ${courseId}, Topic ${topicId}`);
    navigate(`/student-courses/video/${topicId}`);
  };
  
  const filteredEnrolledCourses = enrolledCourses.filter(
    course => course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAvailableCourses = availableCourses.filter(
    course => course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getCurrentCourse = () => {
    return enrolledCourses.find(course => course.id === selectedCourse) || null;
  };
  
  const currentCourse = getCurrentCourse();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Courses</h1>
        <p className="text-muted-foreground">Access your enrolled courses and explore new ones</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="design">UI/UX Design</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-6">
          {selectedCourse === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnrolledCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="hover:shadow-md transition-shadow overflow-hidden"
                  onClick={() => handleCourseSelect(course.id)}
                >
                  <div className="h-40 bg-gray-200 relative overflow-hidden">
                    {course.thumbnail && (
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-none">
                        {course.progress}% Complete
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>{course.completedModules}/{course.moduleCount} modules</span>
                        <span>{course.progress}% complete</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} className="text-primary" />
                        <span>{course.moduleCount} Modules</span>
                      </div>
                      
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : currentCourse ? (
            <div className="space-y-6">
              <Card>
                <div className="md:flex">
                  <div className="md:w-64 h-40 md:h-auto bg-gray-200 relative">
                    {currentCourse.thumbnail && (
                      <img 
                        src={currentCourse.thumbnail} 
                        alt={currentCourse.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mb-2 -ml-2" 
                          onClick={() => setSelectedCourse(null)}
                        >
                          <ChevronRight size={16} className="rotate-180 mr-1" />
                          Back to Courses
                        </Button>
                        <h2 className="text-2xl font-bold">{currentCourse.title}</h2>
                        <p className="text-muted-foreground">Instructor: {currentCourse.instructor}</p>
                      </div>
                      
                      <Badge variant="outline" className="bg-primary/10 text-primary w-fit">
                        {currentCourse.progress}% Complete
                      </Badge>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${currentCourse.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                        <span>{currentCourse.completedModules}/{currentCourse.moduleCount} modules completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Course Content</h3>
                
                {currentCourse.modules.map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <CardHeader 
                      className="pb-2 cursor-pointer hover:bg-secondary/20 transition-colors"
                      onClick={() => handleModuleToggle(module.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription>{module.topics.length} topics</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={module.progress === 100 ? "bg-green-100 text-green-600" : ""}>
                            {module.progress}% Complete
                          </Badge>
                          <ChevronRight 
                            size={18} 
                            className={`transition-transform ${expandedModule === module.id ? 'rotate-90' : ''}`} 
                          />
                        </div>
                      </div>
                    </CardHeader>
                    
                    {expandedModule === module.id && (
                      <CardContent>
                        <div className="space-y-3 pt-2 border-t mt-2">
                          {module.topics.map((topic) => (
                            <div 
                              key={topic.id} 
                              className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${topic.completed ? 'bg-green-100 text-green-600' : 'bg-secondary'}`}>
                                  {topic.type === 'video' ? <Video size={16} /> : <FileText size={16} />}
                                </div>
                                <div>
                                  <p className="font-medium">{topic.title}</p>
                                  <p className="text-xs text-muted-foreground">{topic.duration}</p>
                                </div>
                              </div>
                              <Button 
                                variant={topic.completed ? "outline" : "default"}
                                size="sm"
                                onClick={() => handleWatchVideo(currentCourse.id, topic.id)}
                              >
                                {topic.completed ? "Rewatch" : "Watch Now"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAvailableCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-40 bg-gray-200 relative overflow-hidden">
                  {course.thumbnail && (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <Badge className="absolute top-3 right-3">
                    {course.enrollmentStatus}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-muted-foreground" />
                        <span className="text-sm">Starts: {course.startDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-muted-foreground" />
                      <span className="text-sm">Instructor: {course.instructor}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full">
                    Enroll Now
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

export default StudentCourses;
