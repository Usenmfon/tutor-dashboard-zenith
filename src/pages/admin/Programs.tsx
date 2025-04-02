
import React, { useState } from "react";
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
import { PlusCircle, Edit, Trash2, Users, GraduationCap, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProgramManagementModal from "@/components/admin/ProgramManagementModal";

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
    branches: ["UI Design", "UX Research", "Prototyping"]
  },
  {
    id: "2",
    name: "Software Development",
    description: "Become a full-stack developer",
    price: 75000,
    duration: "16 weeks",
    tutors: 5,
    students: 60,
    branches: ["Frontend", "Backend", "Mobile"]
  },
  {
    id: "3",
    name: "Data Science",
    description: "Master data analysis and visualization",
    price: 65000,
    duration: "14 weeks",
    tutors: 4,
    students: 30,
    branches: ["Data Analysis", "Machine Learning", "Data Visualization"]
  },
  {
    id: "4",
    name: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing",
    price: 45000,
    duration: "10 weeks",
    tutors: 2,
    students: 25,
    branches: ["SEO/SEM", "Social Media", "Content Marketing"]
  }
];

const AdminPrograms = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState(mockPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<any>(null);

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        tutors: 0,
        students: 0
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Management</h1>
          <p className="text-muted-foreground">Create and manage educational programs</p>
        </div>
        <Button onClick={handleAddProgram} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Program
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programs</CardTitle>
          <CardDescription>View and manage all educational programs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

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
