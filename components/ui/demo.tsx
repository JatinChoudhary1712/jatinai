"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { Sparkles, ExternalLink } from "lucide-react";

export function LinkPreviewDemoSecond() {
  return (
    <div className="flex justify-center items-start min-h-[24rem] flex-col px-4 py-8 bg-zinc-950/60 rounded-xl border border-neutral-800 text-left">
      <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-6">
        <Sparkles className="w-4 h-4" />
        <span>Featured Interactive Previews</span>
      </div>

      <p className="text-neutral-300 text-lg md:text-2xl max-w-3xl text-left mb-8 leading-relaxed">
        Visit{" "}
        <LinkPreview
          url="https://ui.aceternity.com"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-500 underline decoration-purple-500/30 underline-offset-4"
        >
          Aceternity UI
        </LinkPreview>{" "}
        for amazing Tailwind CSS and Framer Motion animated components.
      </p>

      <p className="text-neutral-300 text-lg md:text-2xl max-w-3xl text-left leading-relaxed">
        Explore{" "}
        <LinkPreview
          url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
          imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&q=80"
          isStatic
          className="font-bold text-sky-400 underline decoration-sky-400/30 underline-offset-4"
        >
          generative art & abstract visuals
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview
          url="https://images.unsplash.com/photo-1518770660439-4636190af475"
          imageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80"
          isStatic
          className="font-bold text-emerald-400 underline decoration-emerald-400/30 underline-offset-4"
        >
          neural hardware & GPU compute
        </LinkPreview>{" "}
        for powering LLM workflows.
      </p>
    </div>
  );
}
