
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AssignmentForm from "../AssignmentForm";
import { Assignment, Module } from "../types";

interface EditAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: Assignment) => void;
  modules: Module[];
  assignment: Assignment;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  modules,
  assignment,
}) => {
  const handleSave = (updatedAssignment: Assignment) => {
    onSave(updatedAssignment);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
          <DialogDescription>
            Update assignment details below.
          </DialogDescription>
        </DialogHeader>
        
        <AssignmentForm
          onSave={handleSave}
          onCancel={onClose}
          modules={modules}
          initialValues={assignment}
        />
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              // Trigger form submission via custom event
              document.dispatchEvent(new Event('assignment-submit'));
            }}
          >
            Update Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssignmentModal;
