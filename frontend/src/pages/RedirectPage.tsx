import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from './NotFound';

const RedirectPageC: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await fetch('/api/resolve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shortenedUrl: slug }),
        });
        if (response.ok) {
          const result = await response.json();
          setOriginalUrl(result.originalUrl);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch original URL", error);
        setNotFound(true);
      }
    };

    fetchOriginalUrl();
    return () => {
    };
  }, [slug]);

  if (notFound) {
    return <NotFound />;
  }

  if (originalUrl) {
    window.location.href = originalUrl;
    return null;
  }

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default RedirectPageC;
