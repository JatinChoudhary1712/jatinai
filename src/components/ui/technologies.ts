import {
  Boxes,
  Database,
  FileCode,
  Network,
  Server,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Technology {
  name: string;
  category: string;
  /** simple-icons slug — resolved to a real brand mark in tech-icon-paths.ts. */
  slug?: string;
  /** Fallback glyph for technologies with no brand logo (RAG, REST, SQL, ...). */
  icon?: LucideIcon;
  color: string;
  /** 1 = core identity, 4 = peripheral tooling. Drives how often it appears. */
  tier: 1 | 2 | 3 | 4;
}

export const technologies: Technology[] = [
  // Tier 1 — core identity
  { name: "Python", category: "Language", slug: "python", color: "#3776AB", tier: 1 },
  { name: "LangChain", category: "GenAI", slug: "langchain", color: "#7FC8FF", tier: 1 },
  { name: "LangGraph", category: "GenAI", slug: "langgraph", color: "#7FC8FF", tier: 1 },
  { name: "LlamaIndex", category: "GenAI", icon: Boxes, color: "#8B5CF6", tier: 2 },
  { name: "RAG Pipelines", category: "GenAI", icon: Boxes, color: "#22D3EE", tier: 1 },
  { name: "FastAPI", category: "Backend", slug: "fastapi", color: "#009688", tier: 1 },
  { name: "PostgreSQL", category: "Database", slug: "postgresql", color: "#4169E1", tier: 1 },
  { name: "vLLM", category: "Inference", slug: "vllm", color: "#30A2FF", tier: 1 },
  { name: "OpenAI", category: "LLM", icon: Sparkles, color: "#10A37F", tier: 1 },
  { name: "Mistral", category: "LLM", slug: "mistralai", color: "#FA520F", tier: 1 },
  { name: "Gemini", category: "LLM", slug: "googlegemini", color: "#8E75B2", tier: 1 },

  // Tier 2 — AI infrastructure
  { name: "FAISS", category: "Vector Search", slug: "meta", color: "#0467DF", tier: 2 },
  { name: "Chroma", category: "Vector DB", icon: Database, color: "#F0AE3C", tier: 2 },
  { name: "Pinecone", category: "Vector DB", icon: Database, color: "#44D7B6", tier: 2 },
  { name: "Qdrant", category: "Vector DB", icon: Database, color: "#DC2626", tier: 2 },
  { name: "Weaviate", category: "Vector DB", icon: Database, color: "#F97316", tier: 2 },
  { name: "pgvector", category: "Vector DB", icon: Database, color: "#4169E1", tier: 2 },
  { name: "Milvus", category: "Vector DB", icon: Database, color: "#5B5FEF", tier: 3 },
  { name: "LiteLLM", category: "LLM Gateway", icon: Network, color: "#6FD08C", tier: 2 },
  { name: "DSPy", category: "GenAI", icon: FileCode, color: "#F59E0B", tier: 3 },
  { name: "PydanticAI", category: "GenAI", icon: FileCode, color: "#E11D48", tier: 3 },
  { name: "Agentic Workflows", category: "GenAI", icon: Workflow, color: "#C084FC", tier: 2 },
  { name: "Prompt Engineering", category: "GenAI", icon: FileCode, color: "#E879F9", tier: 2 },
  { name: "Docker", category: "Infrastructure", slug: "docker", color: "#2496ED", tier: 2 },

  // Tier 3 — additional stack
  { name: "TypeScript", category: "Language", slug: "typescript", color: "#3178C6", tier: 3 },
  { name: "SQL", category: "Language", icon: Database, color: "#E38C00", tier: 3 },
  { name: "Claude", category: "LLM", slug: "claude", color: "#D97757", tier: 3 },
  { name: "Hugging Face", category: "Models", slug: "huggingface", color: "#FFD21E", tier: 3 },
  { name: "Ollama", category: "Local LLM", icon: Server, color: "#E5E7EB", tier: 3 },
  { name: "n8n", category: "Automation", slug: "n8n", color: "#EA4B71", tier: 3 },
  { name: "REST APIs", category: "Backend", icon: Server, color: "#94A3B8", tier: 3 },
  { name: "RunPod GPU", category: "Infrastructure", icon: Server, color: "#8B5CF6", tier: 3 },
  { name: "ERPNext", category: "Backend", slug: "erpnext", color: "#0089FF", tier: 3 },

  // Tier 4 — tools
  { name: "Git", category: "Tooling", slug: "git", color: "#F03C2E", tier: 4 },
  { name: "Jira", category: "Tooling", slug: "jira", color: "#0052CC", tier: 4 },
  { name: "Figma", category: "Tooling", slug: "figma", color: "#F24E1E", tier: 4 },
  { name: "Notion", category: "Tooling", slug: "notion", color: "#E5E5E5", tier: 4 },
  { name: "Zapier", category: "Automation", slug: "zapier", color: "#FF4F00", tier: 4 },
];

/** Higher weight = shows up more often. */
export const tierWeight: Record<Technology["tier"], number> = { 1: 5, 2: 3, 3: 2, 4: 1 };
