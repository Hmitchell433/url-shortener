"use client";

import React, { useState } from "react";
import styles from "./ResolveUrlForm.module.css";

type ResolveUrlForm = {};

const apiPath = "/api/resolve";

export const ResolveUrlForm: React.FC<ResolveUrlForm> = ({ }) => {
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortenedUrl }),
      });

      if (response.ok) {
        const result = await response.json();
        setShortenedUrl('')
      } else {
        console.error("Failed to resolve shortened URL");
      }
    } catch (error) {
      console.error("Failed to resolve shortened URL", error);
    }
  };

  return (
    <div className={styles.resolveUrlForm}>
      <form onSubmit={handleSubmit}>
        <label>
          Shortened URL:
          <input
            type="text"
            value={shortenedUrl}
            onChange={(e) => setShortenedUrl(e.target.value)}
          />
        </label>
        <button type="submit">Resolve URL</button>
      </form>
    </div>
  );
};
