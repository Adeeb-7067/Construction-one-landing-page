import { createFileRoute } from "@tanstack/react-router";
import { PolicyLayout } from "@/components/landing/PolicyLayout";
import { useLandingData } from "@/hooks/useLandingData";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Construction One" },
      { name: "description", content: "Privacy policy and data protection guidelines for Construction One." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const { data, isLoading } = useLandingData();
  const policy = data?.company?.policy;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <PolicyLayout 
      title="Privacy Policy" 
      content={policy?.privacyPolicy || ""} 
    />
  );
}
