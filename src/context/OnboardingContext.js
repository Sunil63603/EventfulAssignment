"use client";

//static JSON files
import artistsData from "@/data/artists.json";

//function which returns unique values to be displayed in dropdowns
import { getUniqueValues } from "@/components/artists/ArtistFilters";

//react hooks
import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";

//form validation using both 'react-hook-form' and 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const OnboardingContext = createContext();

//custom context hook
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboarding must be used within an OnboardingProvider. " +
        "Check your component hierarchy."
    );
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

  // Schema for form validation
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().max(500, "Bio must be less than 500 characters"),
    category: z.array(z.string()).min(1, "Select at least one category"),
    languages: z.array(z.string()).min(1, "Select at least one language"),
    fee: z.string().min(1, "Please select a fee range"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    image: z.any().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
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

    // Reset form with proper default values
    form.reset({
      name: "",
      bio: "",
      category: [],
      languages: [],
      fee: "",
      location: "",
      image: null,
    });
  };

  return (
    <OnboardingContext.Provider
      value={{ categories, languages, feeRanges, form, onSubmit }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
