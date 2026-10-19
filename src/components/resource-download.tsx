"use client";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { track } from "@/lib/analytics";
export function ResourceDownload({ slug }: { slug: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/downloads/${slug}.txt`);
      if (!response.ok)
        throw new Error(
          "The worksheet could not be downloaded. Please try again.",
        );
      const blob = await response.blob();
      if (!blob.size)
        throw new Error("The worksheet is temporarily unavailable.");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = slug + ".txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      track("resource_download", { contentId: slug });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button className="button" onClick={download} disabled={busy}>
        {busy ? "Preparing Your Worksheet…" : "Download the Free Worksheet"}
        {busy ? <LoaderCircle size={16} /> : <ArrowUpRight size={16} />}
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
