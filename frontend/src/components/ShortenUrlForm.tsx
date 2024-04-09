"use client";

import React, { useState } from "react";
import styles from "./ShortenUrlForm.module.css";
import NotFound from '../pages/NotFound';

type ShortenUrlFormProps = {};

const apiPath = "/api/shorten";

export const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ }) => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [notFound, setNotFound] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlRegex.test(originalUrl)) {
      setErrorMessage('Please enter a valid URL');
      return;
    }

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (response.ok) {
        const result = await response.json();
        setShortenedUrl(result.shortenedUrl);
        setOriginalUrl('')
      } else {
        console.error('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Failed to shorten URL', error);
    }
  };

  const handleInputFocus = () => {
    setErrorMessage('');
  };

  const handleRedirect = async () => {
    if (!shortenedUrl) {
      console.error('Shortened URL is null');
      return;
    }

    try {
      const response = await fetch("/api/urlResolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortenedUrl }),
      });

      if (response.ok) {
        const result = await response.json();
        const newTab = window.open(result.originalUrl, '_blank');
        if (newTab) {
          newTab.focus();
        }
        setShortenedUrl('')
      } else {
        setNotFound(true);
        console.error("Failed to resolve shortened URL");
      }
    } catch (error) {
      console.error("Failed to resolve shortened URL", error);
    }
  };

  return (
    <div className={styles.shortenUrlForm}>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <br></br>
          <input type="text" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} onFocus={handleInputFocus} />
        </label>
        <br></br>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button type="submit">Shorten URL</button>
      </form>
      {shortenedUrl && (
        <div>
          Shortened URL: <button onClick={handleRedirect}>{shortenedUrl}</button>
        </div>
      )}
      {notFound && <NotFound />}
    </div>
  );
};

