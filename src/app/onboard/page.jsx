//context provider
import { OnboardingProvider } from "@/context/OnboardingContext";

//client-component
import OnboardingForm from "@/components/onboarding/OnboardingForm";

//meta-data for each and every page for better SEO
export const metadata = {
  title: "Artist Onboarding | Artist Booking",
  description: "Fill all details",
};

export default function OnboardPage() {
  return (
    <OnboardingProvider>
      <OnboardingForm />
    </OnboardingProvider>
  );
}
