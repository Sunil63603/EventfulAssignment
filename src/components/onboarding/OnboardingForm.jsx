"use client";

import { useOnboarding } from "@/context/OnboardingContext";
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

export default function OnboardingForm() {
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
            <FormLabel>Category</FormLabel>
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
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, cat]
                              : field.value.filter((v) => v !== cat);
                            field.onChange(newValue);
                          }}
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
          </FormItem>

          {/* Languages */}
          <FormItem>
            <FormLabel>Languages Spoken</FormLabel>
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
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, lang]
                              : field.value.filter((v) => v !== lang);
                            field.onChange(newValue);
                          }}
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
                    onChange={(e) => field.onChange(e.target.files?.[0])}
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
