//context provider
import { OnboardingProvider } from "@/context/OnboardingContext";

//client-component
import OnboardingForm from "@/components/onboarding/OnboardingForm";

export default function OnboardPage() {
  return (
    <OnboardingProvider>
      <OnboardingForm />
    </OnboardingProvider>
  );
}
