import { OnboardingProvider } from "@/context/OnboardingContext";
import OnboardingForm from "@/components/onboarding/OnboardingForm";

export default function OnboardPage() {
  return (
    <OnboardingProvider>
      <OnboardingForm />
    </OnboardingProvider>
  );
}
