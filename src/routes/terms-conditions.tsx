import { createFileRoute } from "@tanstack/react-router";
import { PolicyLayout } from "@/components/landing/PolicyLayout";
import { useLandingData } from "@/hooks/useLandingData";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Construction One" },
      { name: "description", content: "Terms and conditions for using the Construction One marketplace." },
    ],
  }),
  component: TermsConditions,
});

function TermsConditions() {
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
      title="Terms & Conditions" 
      content={policy?.termsAndConditions || ""} 
    />
  );
}
