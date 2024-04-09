import React, { useEffect, useState } from 'react';

interface UrlPair {
  original: string;
  shortened: string;
}

interface AllUrlsProps {
}

const AllUrls: React.FC<AllUrlsProps> = () => {
  const [urls, setUrls] = useState<UrlPair[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/all');
        const responseData = await response.json();
        if (responseData.urls) {
          setUrls(responseData.urls);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="grid">
        <thead>
          <tr>
            <th className="gridHeader">Original URL</th>
            <th className="gridHeader">Shortened URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={index}>
              <td className="gridCell">{url.original}</td>
              <td className="gridCell">{url.shortened}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default AllUrls;
