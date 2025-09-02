import { HeroSection } from "@/components/HeroSection";
import { ContentLibrary } from "@/components/ContentLibrary";
import MentorDirectory from "@/components/MentorDirectory";
import { AccessibilitySection } from "@/components/AccessibilitySection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ContentLibrary />
      <MentorDirectory />
      <AccessibilitySection />
    </div>
  );
}
