"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export function InteractiveBio() {
  return (
    <p className="font-sans text-sm leading-relaxed mt-4 text-gray-300 antialiased">
      Gen AI engineer building production LLM systems: RAG pipelines, agentic
      workflows, and document intelligence. Currently shipping OCR and vLLM
      inference pipelines at{" "}
      <LinkPreview
        url="https://veritos.in"
        className="font-medium text-white hover:text-primary transition-colors underline decoration-primary/40 underline-offset-4"
      >
        Veritos Infosolution
      </LinkPreview>
      , previously founding-team AI Product Engineer at{" "}
      <LinkPreview
        url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
        imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&q=80"
        isStatic
        className="font-medium text-white hover:text-primary transition-colors underline decoration-primary/40 underline-offset-4"
      >
        WorkableAI
      </LinkPreview>
      .
    </p>
  );
}
