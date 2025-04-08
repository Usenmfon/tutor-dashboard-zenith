
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit, Trash2, Users, GraduationCap, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProgramManagementModal from "@/components/admin/ProgramManagementModal";

// Import courses data (update the path if needed)
import { programs, coursesByProgram } from "@/data/classroom-programs";

// Mock data for programs
const mockPrograms = [
  {
    id: "1",
    name: "UI/UX Design",
    description: "Learn UI/UX design principles and tools",
    price: 50000,
    duration: "12 weeks",
    tutors: 3,
    students: 45,
    branches: ["UI Design", "UX Research", "Prototyping"],
    courses: 5,
    assignedStudents: ["1", "3"],
    assignedTutors: ["2"]
  },
  {
    id: "2",
    name: "Software Development",
    description: "Become a full-stack developer",
    price: 75000,
    duration: "16 weeks",
    tutors: 5,
    students: 60,
    branches: ["Frontend", "Backend", "Mobile"],
    courses: 8,
    assignedStudents: ["3", "5"],
    assignedTutors: ["4"]
  },
  {
    id: "3",
    name: "Data Science",
    description: "Master data analysis and visualization",
    price: 65000,
    duration: "14 weeks",
    tutors: 4,
    students: 30,
    branches: ["Data Analysis", "Machine Learning", "Data Visualization"],
    courses: 6,
    assignedStudents: ["1"],
    assignedTutors: ["2"]
  },
  {
    id: "4",
    name: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing",
    price: 45000,
    duration: "10 weeks",
    tutors: 2,
    students: 25,
    branches: ["SEO/SEM", "Social Media", "Content Marketing"],
    courses: 4,
    assignedStudents: ["5"],
    assignedTutors: ["4"]
  }
];

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    name: "Introduction to UI Design",
    program: "UI/UX Design",
    branch: "UI Design",
    duration: "2 weeks",
    modules: 5,
    students: 32
  },
  {
    id: "2",
    name: "User Research Methods",
    program: "UI/UX Design",
    branch: "UX Research",
    duration: "3 weeks",
    modules: 6,
    students: 28
  },
  {
    id: "3",
    name: "Frontend Development Basics",
    program: "Software Development",
    branch: "Frontend",
    duration: "4 weeks",
    modules: 8,
    students: 45
  },
  {
    id: "4",
    name: "Backend with Node.js",
    program: "Software Development",
    branch: "Backend",
    duration: "4 weeks",
    modules: 7,
    students: 38
  },
  {
    id: "5",
    name: "Introduction to Data Analysis",
    program: "Data Science",
    branch: "Data Analysis",
    duration: "3 weeks",
    modules: 6,
    students: 25
  },
  {
    id: "6",
    name: "SEO Fundamentals",
    program: "Digital Marketing",
    branch: "SEO/SEM",
    duration: "2 weeks",
    modules: 4,
    students: 20
  }
];

// Mock data for classrooms
const mockClassrooms = [
  {
    id: "1",
    name: "UI/UX Design Class A",
    program: "UI/UX Design",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    students: 20,
    tutors: 2
  },
  {
    id: "2",
    name: "Software Development Cohort 3",
    program: "Software Development",
    startDate: "2023-08-15",
    endDate: "2023-12-15",
    students: 25,
    tutors: 3
  },
  {
    id: "3",
    name: "Data Science Evening Class",
    program: "Data Science",
    startDate: "2023-10-01",
    endDate: "2024-01-15",
    students: 15,
    tutors: 2
  },
  {
    id: "4",
    name: "Digital Marketing Weekend Class",
    program: "Digital Marketing",
    startDate: "2023-09-15",
    endDate: "2023-11-20",
    students: 18,
    tutors: 1
  }
];

const AdminPrograms = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState(mockPrograms);
  const [courses, setCourses] = useState(mockCourses);
  const [classrooms, setClassrooms] = useState(mockClassrooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("programs");

  // Get unique branches from all programs
  const allBranches = React.useMemo(() => {
    const branchSet = new Set<string>();
    programs.forEach(program => {
      program.branches.forEach(branch => branchSet.add(branch));
    });
    return Array.from(branchSet);
  }, [programs]);

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter courses based on selected program, branch, and search term
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || course.program === selectedProgram;
    const matchesBranch = selectedBranch === "all" || course.branch === selectedBranch;
    return matchesSearch && matchesProgram && matchesBranch;
  });

  // Filter classrooms based on selected program and search term
  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || classroom.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  // Update available branches when selected program changes
  useEffect(() => {
    if (selectedProgram !== "all") {
      setSelectedBranch("all");
    }
  }, [selectedProgram]);

  const handleAddProgram = () => {
    setCurrentProgram(null);
    setModalOpen(true);
  };

  const handleEditProgram = (program: any) => {
    setCurrentProgram(program);
    setModalOpen(true);
  };

  const handleDeleteProgram = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    setPrograms(programs.filter(p => p.id !== programId));

    toast({
      title: "Program deleted",
      description: `${program?.name} has been deleted.`,
    });
  };

  const handleSaveProgram = (programData: any) => {
    if (currentProgram) {
      // Update existing program
      setPrograms(programs.map(program =>
        program.id === currentProgram.id ? { ...program, ...programData } : program
      ));

      toast({
        title: "Program updated",
        description: `${programData.name} has been updated.`,
      });
    } else {
      // Add new program
      const newProgram = {
        id: (programs.length + 1).toString(),
        ...programData,
        tutors: programData.assignedTutors?.length || 0,
        students: programData.assignedStudents?.length || 0,
        courses: 0
      };

      setPrograms([...programs, newProgram]);

      toast({
        title: "Program added",
        description: `${programData.name} has been added.`,
      });
    }

    setModalOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Management</h1>
          <p className="text-muted-foreground">Create and manage educational programs, courses, and classrooms</p>
        </div>
        <Button onClick={handleAddProgram} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Program
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Program Overview</CardTitle>
              <CardDescription>View and manage all educational content</CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid w-full sm:w-[400px] grid-cols-3">
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-[200px]">
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map(program => (
                    <SelectItem key={program.id} value={program.name}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeTab === "courses" && (
              <div className="w-[200px]">
                <Select 
                  value={selectedBranch} 
                  onValueChange={setSelectedBranch}
                  disabled={selectedProgram === "all"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {selectedProgram !== "all" && programs
                      .find(p => p.name === selectedProgram)?.branches
                      .map((branch, index) => (
                        <SelectItem key={index} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <TabsContent value="programs" className="m-0">
            {filteredPrograms.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Branches</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Tutors</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{program.description}</TableCell>
                        <TableCell>{formatCurrency(program.price)}</TableCell>
                        <TableCell>{program.duration}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {program.branches.map((branch, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {branch}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} className="text-primary" />
                            {program.courses}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <GraduationCap size={14} className="text-primary" />
                            {program.tutors}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-primary" />
                            {program.students}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEditProgram(program)}>
                              <Edit size={16} className="text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProgram(program.id)}>
                              <Trash2 size={16} className="text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-md">
                <div className="flex justify-center items-center mb-3">
                  <BookOpen size={48} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No programs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or add a new program.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="courses" className="m-0">
            {filteredCourses.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Modules</TableHead>
                      <TableHead>Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.program}</Badge>
                        </TableCell>
                        <TableCell>{course.branch}</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>{course.modules}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-primary" />
                            {course.students}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-md">
                <div className="flex justify-center items-center mb-3">
                  <BookOpen size={48} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="classrooms" className="m-0">
            {filteredClassrooms.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Classroom Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Tutors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClassrooms.map((classroom) => (
                      <TableRow key={classroom.id}>
                        <TableCell className="font-medium">{classroom.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{classroom.program}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(classroom.startDate)}</TableCell>
                        <TableCell>{formatDate(classroom.endDate)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-primary" />
                            {classroom.students}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <GraduationCap size={14} className="text-primary" />
                            {classroom.tutors}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-md">
                <div className="flex justify-center items-center mb-3">
                  <Users size={48} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No classrooms found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Card>

      <ProgramManagementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProgram}
        program={currentProgram}
      />
    </div>
  );
};

export default AdminPrograms;
