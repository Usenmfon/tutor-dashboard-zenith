
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LiveClass } from "@/types/liveClass";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Module, Topic } from "@/components/classrooms/tabs/modules/types";

interface CreateClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateClass: (classData: Partial<LiveClass>) => void;
  modules: Module[];
}

const CreateClassDialog: React.FC<CreateClassDialogProps> = ({
  open,
  onOpenChange,
  onCreateClass,
  modules = []
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classroom, setClassroom] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [topicId, setTopicId] = useState("");

  const selectedModule = modules.find(m => m.id === moduleId);
  const topics = selectedModule ? selectedModule.topics : [];

  // Reset topic when module changes
  useEffect(() => {
    if (moduleId && selectedModule) {
      // If we change module, reset the topic selection
      if (selectedModule.topics.length > 0) {
        setTopicId(selectedModule.topics[0].id);
      }
    } else {
      setTopicId("");
    }
  }, [moduleId, selectedModule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !classroom.trim() || !date || !startTime || !endTime) return;

    const formattedDate = format(date, "MMMM d, yyyy");

    onCreateClass({
      title,
      description,
      classroom,
      classroomId: "classroom-id", // In a real app, this would be fetched from the selected classroom
      date: formattedDate,
      startTime,
      endTime,
      meetingLink: meetingLink || undefined,
      status: "scheduled",
      totalStudents: 28, // In a real app, this would be fetched from the classroom data
      moduleId: moduleId || undefined,
      topicId: topicId || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setClassroom("");
    setDate(undefined);
    setStartTime("");
    setEndTime("");
    setMeetingLink("");
    setModuleId("");
    setTopicId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule Live Class</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Class Title</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Introduction to UX Design Principles"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe what will be covered in this class"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classroom">Classroom</Label>
              <Input 
                id="classroom"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                placeholder="e.g., UX Design Studio"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                </span>
                <Input 
                  id="start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="e.g., 10:00 AM"
                  className="rounded-l-none"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                </span>
                <Input 
                  id="end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="e.g., 11:30 AM"
                  className="rounded-l-none"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meeting-link">Meeting Link (Optional)</Label>
            <Input 
              id="meeting-link"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="e.g., https://zoom.us/j/123456789"
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to generate a meeting link automatically when the class starts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="module">Module (Optional)</Label>
              <Select value={moduleId} onValueChange={setModuleId}>
                <SelectTrigger id="module">
                  <SelectValue placeholder="Select a module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>
                      {module.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {moduleId && topics.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select value={topicId} onValueChange={setTopicId}>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Schedule Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
