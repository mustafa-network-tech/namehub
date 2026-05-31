"use client";

import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  buttonLabel?: string;
  defaultValue?: string;
  size?: "md" | "lg";
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  placeholder = "Ara...",
  buttonLabel = "Ara",
  defaultValue = "",
  size = "md",
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(value.trim());
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      className={`card-base flex items-center gap-2 p-1.5 ${
        size === "lg" ? "rounded-2xl" : "rounded-xl"
      }`}
    >
      <span className="pl-3 text-muted" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`min-h-[44px] w-full bg-transparent text-base text-ink outline-none placeholder:text-muted ${
          size === "lg" ? "sm:text-lg" : ""
        }`}
      />
      <button
        type="submit"
        className="btn-touch focus-ring shrink-0 bg-accent px-5 text-white hover:bg-accent-hover"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
