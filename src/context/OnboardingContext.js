"use client";

import artistsData from "@/data/artists.json";

import { createContext, useContext, useState } from "react";
import { getUniqueValues } from "@/components/artists/ArtistFilters";

import { useForm } from "react-hook-form";

const OnboardingContext = createContext();

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  const categories = getUniqueValues(artistsData, "category");
  const feeRanges = getUniqueValues(artistsData, "fee");
  // Static list for languages to match the form's intent
  const languages = [
    "English",
    "Hindi",
    "Marathi",
    "Punjabi",
    "Kannada",
    "Telugu",
    "Tamil",
  ];

  const form = useForm({
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      fee: "",
      location: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    console.log(`Artist Submitted:`, data);
    alert("Form submitted! Check the console for form data.");
    form.reset();
  };

  return (
    <OnboardingContext.Provider
      value={{ categories, languages, feeRanges, form, onSubmit }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
