
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Link, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubmitAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentId: string;
  assignmentTitle: string;
  submissionType?: "file_upload" | "link" | "text_input";
}

const SubmitAssignmentModal: React.FC<SubmitAssignmentModalProps> = ({
  isOpen,
  onClose,
  assignmentId,
  assignmentTitle,
  submissionType = "file_upload"
}) => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<"file_upload" | "link" | "text_input">(submissionType);
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate submission based on selected type
    if (selectedType === "file_upload" && !file) {
      toast({
        title: "File required",
        description: "Please upload a file to submit.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (selectedType === "link" && !linkUrl) {
      toast({
        title: "Link required",
        description: "Please provide a link to your submission.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (selectedType === "text_input" && !textContent) {
      toast({
        title: "Text required",
        description: "Please provide content for your submission.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Submit logic would go here in a real application
    // For now, simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Assignment Submitted",
        description: "Your assignment has been submitted successfully.",
      });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
          <DialogDescription>
            {assignmentTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Submission Type</Label>
            <RadioGroup 
              value={selectedType}
              onValueChange={(value) => setSelectedType(value as any)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="file_upload" id="file_upload" />
                <Label htmlFor="file_upload" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  File Upload
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="link" id="link" />
                <Label htmlFor="link" className="flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  External Link
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text_input" id="text_input" />
                <Label htmlFor="text_input" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Text Input
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {selectedType === "file_upload" && (
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </label>
              </div>
              {file && (
                <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {selectedType === "link" && (
            <div className="space-y-2">
              <Label htmlFor="url-input">External Link</Label>
              <Input
                id="url-input"
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Provide a link to your external work (e.g., GitHub, Figma, Google Docs)
              </p>
            </div>
          )}
          
          {selectedType === "text_input" && (
            <div className="space-y-2">
              <Label htmlFor="text-input">Your Submission</Label>
              <Textarea
                id="text-input"
                placeholder="Enter your submission content here..."
                className="min-h-[200px]"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitAssignmentModal;
