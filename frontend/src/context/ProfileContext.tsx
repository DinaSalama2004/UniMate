import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProfileData, Course } from "@/types";

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  profileCompletion: number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  hasCompletedSetup: boolean;
  setHasCompletedSetup: (completed: boolean) => void;
}

const defaultProfile: ProfileData = {
  university: "",
  college: "",
  academicYear: "",
  interests: [],
  courses: [],
  gpa: undefined,
  careerPreferences: [],
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const calculateCompletion = () => {
    let score = 0;
    if (profile.university) score += 15;
    if (profile.college) score += 15;
    if (profile.academicYear) score += 10;
    if (profile.interests.length > 0) score += 20;
    if (profile.courses.length > 0) score += 25;
    if (profile.careerPreferences && profile.careerPreferences.length > 0) score += 15;
    return score;
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        profileCompletion: calculateCompletion(),
        currentStep,
        setCurrentStep,
        hasCompletedSetup,
        setHasCompletedSetup,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}