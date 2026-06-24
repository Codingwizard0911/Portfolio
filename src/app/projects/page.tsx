import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import { projects } from "@/lib/data/projects";
import ProjectsClient from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects by Umapathi R — Transit analytics ML platform, hiring marketplace, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <SectionHeader
            label="Projects"
            title="Things I've built"
            description="Production systems, research platforms, and engineering experiments — each one solving a real problem."
          />
        </AnimatedSection>

        <ProjectsClient projects={projects} />
      </div>
    </div>
  );
}
