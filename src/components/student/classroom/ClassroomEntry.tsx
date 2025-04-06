
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMockClassroomData } from "./classroomData";
import BackButton from "./BackButton";
import ClassroomHeader from "./ClassroomHeader";
import ClassroomTabs from "./ClassroomTabs";

interface ClassroomEntryProps {
  classroomId: string;
}

const ClassroomEntry: React.FC<ClassroomEntryProps> = ({ classroomId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("modules");
  const [newPost, setNewPost] = useState("");

  // Get classroom data
  const classroom = getMockClassroomData(classroomId);

  const handleViewTopic = (topicId: string) => {
    navigate(`/student-classroom/${classroomId}/topic/${topicId}`);
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    // In a real app, this would send the post to an API
    setNewPost("");
  };

  const handleLike = (postId: string) => {
    // In a real app, this would update likes via an API
    console.log(`Liked post: ${postId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <BackButton onClick={() => navigate("/student-classrooms")} />
      
      <ClassroomHeader classroom={classroom} />

      <ClassroomTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        classroom={classroom}
        newPost={newPost}
        setNewPost={setNewPost}
        handlePostSubmit={handlePostSubmit}
        handleLike={handleLike}
        handleViewTopic={handleViewTopic}
      />
    </div>
  );
};

export default ClassroomEntry;
