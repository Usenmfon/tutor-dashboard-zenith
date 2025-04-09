
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Users, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProgramManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (programData: any) => void;
  program: any | null;
}

const ProgramSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be greater than 0" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  branches: z.array(z.string()).optional(),
});

// Mock data for users that could be assigned to programs
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "student" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "tutor" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com", role: "student" },
  { id: "4", name: "Bob Williams", email: "bob@example.com", role: "tutor" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com", role: "student" },
];

const ProgramManagementModal: React.FC<ProgramManagementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  program,
}) => {
  const [newBranch, setNewBranch] = useState("");
  const [branches, setBranches] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  const [assignedStudents, setAssignedStudents] = useState<string[]>([]);
  const [assignedTutors, setAssignedTutors] = useState<string[]>([]);

  const form = useForm<z.infer<typeof ProgramSchema>>({
    resolver: zodResolver(ProgramSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: "",
      branches: [],
    },
  });

  // Set form values when editing a program
  useEffect(() => {
    if (program) {
      form.reset({
        name: program.name,
        description: program.description,
        price: program.price,
        duration: program.duration,
        branches: program.branches,
      });
      setBranches(program.branches || []);
      setAssignedStudents(program.assignedStudents || []);
      setAssignedTutors(program.assignedTutors || []);
    } else {
      form.reset({
        name: "",
        description: "",
        price: 0,
        duration: "",
        branches: [],
      });
      setBranches([]);
      setAssignedStudents([]);
      setAssignedTutors([]);
    }
  }, [program, form]);

  const handleAddBranch = () => {
    if (newBranch.trim() !== "" && !branches.includes(newBranch.trim())) {
      const updatedBranches = [...branches, newBranch.trim()];
      setBranches(updatedBranches);
      form.setValue("branches", updatedBranches);
      setNewBranch("");
    }
  };

  const handleRemoveBranch = (branch: string) => {
    const updatedBranches = branches.filter((b) => b !== branch);
    setBranches(updatedBranches);
    form.setValue("branches", updatedBranches);
  };

  const toggleUser = (userId: string, role: "student" | "tutor") => {
    if (role === "student") {
      setAssignedStudents(prevState => 
        prevState.includes(userId) 
          ? prevState.filter(id => id !== userId)
          : [...prevState, userId]
      );
    } else if (role === "tutor") {
      setAssignedTutors(prevState => 
        prevState.includes(userId) 
          ? prevState.filter(id => id !== userId)
          : [...prevState, userId]
      );
    }
  };

  const onSubmit = (data: z.infer<typeof ProgramSchema>) => {
    // Make sure branches are included in the data
    data.branches = branches;
    
    // Include assigned users in the data
    const programData = {
      ...data,
      assignedStudents,
      assignedTutors
    };
    
    onSave(programData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{program ? "Edit Program" : "Add New Program"}</DialogTitle>
          <DialogDescription>
            {program
              ? "Update the program's information"
              : "Enter the details for the new educational program"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="details" className="flex-1">Program Details</TabsTrigger>
            <TabsTrigger value="students" className="flex-1">Students</TabsTrigger>
            <TabsTrigger value="tutors" className="flex-1">Tutors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter program name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter program description"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₦)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter price in Naira"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 12 weeks"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel>Program Branches</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a branch"
                      value={newBranch}
                      onChange={(e) => setNewBranch(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddBranch}
                      className="flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {branches.map((branch, index) => (
                      <Badge key={index} variant="secondary" className="px-2 py-1">
                        {branch}
                        <button
                          type="button"
                          onClick={() => handleRemoveBranch(branch)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                    {branches.length === 0 && (
                      <span className="text-sm text-muted-foreground">
                        No branches added yet
                      </span>
                    )}
                  </div>
                </FormItem>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="students">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Assign Students</h3>
                <Badge variant="outline">{assignedStudents.length} selected</Badge>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-[80px] text-right">Assign</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers
                      .filter(user => user.role === "student")
                      .map(student => (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant={assignedStudents.includes(student.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleUser(student.id, "student")}
                            >
                              {assignedStudents.includes(student.id) ? "Assigned" : "Assign"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {mockUsers.filter(user => user.role === "student").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
                          No students available to assign
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tutors">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Assign Tutors</h3>
                <Badge variant="outline">{assignedTutors.length} selected</Badge>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-[80px] text-right">Assign</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers
                      .filter(user => user.role === "tutor")
                      .map(tutor => (
                        <TableRow key={tutor.id}>
                          <TableCell>{tutor.name}</TableCell>
                          <TableCell>{tutor.email}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant={assignedTutors.includes(tutor.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleUser(tutor.id, "tutor")}
                            >
                              {assignedTutors.includes(tutor.id) ? "Assigned" : "Assign"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {mockUsers.filter(user => user.role === "tutor").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
                          No tutors available to assign
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            {program ? "Update Program" : "Add Program"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramManagementModal;
