"use client";

//static JSON files
import artistsData from "@/data/artists.json";

//function which returns unique values to be displayed in dropdowns
import { getUniqueValues } from "@/components/artists/ArtistFilters";

//react hooks
import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";

//form validation using both 'react-hook-form' and 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bio: yup.string().required("Bio is required"),
    category: yup
      .array()
      .of(yup.string())
      .min(1, "Select at least one category"),
    languages: yup
      .array()
      .of(yup.string())
      .min(1, "Select at least one language"),
    fee: yup.string().required("Fee range is required"),
    location: yup.string().required("Location is required"),
    image: yup
      .mixed()
      .nullable()
      .notRequired()
      .test("fileSize", "File too large", (value) => {
        if (!value) return true; // optional
        return value.size <= 5 * 1024 * 1024;
      })
      .test("fileType", "Unsupported file type", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
      }),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
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
