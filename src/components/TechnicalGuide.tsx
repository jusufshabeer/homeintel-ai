"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type TechnicalGuideProps = {
  content: string;
  title?: string;
  className?: string;
};

export function TechnicalGuide({ content, title, className }: TechnicalGuideProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm",
        className
      )}
    >
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
      )}
      <article className="[&_h1]:mb-2 [&_h1]:text-base [&_h1]:font-semibold [&_h1]:text-slate-900 [&_h2]:mb-1 [&_h2]:mt-4 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-slate-900 [&_p]:mb-2 [&_p]:text-slate-700 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:text-slate-700 [&_li]:marker:text-slate-500 [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:bg-slate-100 [&_pre]:p-3 [&_pre]:text-xs [&_pre]:text-slate-700">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
