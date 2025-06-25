"use client";

//static JSON files
import artistsData from "@/data/artists.json";

//function which returns unique values to be displayed in dropdowns
import { getUniqueValues } from "@/components/artists/ArtistFilters";

//react hooks
import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";

const OnboardingContext = createContext();

//custom hooks
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  //dropdown options
  const categories = getUniqueValues(artistsData, "category");
  const feeRanges = getUniqueValues(artistsData, "fee");

  // Static list for languages
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
