"use client";

//onboarding context
import { useOnboarding } from "@/context/OnboardingContext";

//shadcn components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

//Function re-used in checkboxes.
const handleCheckboxChange = (field, value, checked) => {
  const newValue = checked
    ? [...field.value, value]
    : field.value.filter((v) => v !== value);
  field.onChange(newValue);
};

//Profile-Image(optional) Validation
const validateFile = (file) => {
  if (!file) return null;

  // File size validation (5MB limit)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    alert("File size must be less than 5MB");
    return null;
  }

  // File type validation
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    alert("Only JPEG, PNG, and WebP files are allowed");
    return null;
  }

  return file;
};

export default function OnboardingForm() {
  //categories,languages,feeRanges are options used in form dropdowns
  const { categories, languages, feeRanges, form, onSubmit } = useOnboarding();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">Artist Onboarding Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Artist Name" {...field}></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          {/* Bio */}
          <FormField
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Short bio..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator></Separator>

          {/* Category */}
          <FormItem>
            <fieldset className="border border-gray-200 rounded p-2">
              <legend className="text-sm font-medium px-1">
                <FormLabel>Category</FormLabel>
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <FormField
                    key={cat}
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(cat)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(field, cat, checked)
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {cat}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </fieldset>
          </FormItem>

          {/* Languages */}
          <FormItem>
            <fieldset className="border border-gray-200 rounded p-2">
              <legend className="text-sm font-medium px-1">
                <FormLabel>Languages Spoken</FormLabel>
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <FormField
                    key={lang}
                    name="languages"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(lang)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(field, lang, checked)
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {lang}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </fieldset>
          </FormItem>

          {/* Fee Range */}
          <FormField
            name="fee"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee Range</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fee Range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {feeRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City / State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(validateFile(e.target.files?.[0]))
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
