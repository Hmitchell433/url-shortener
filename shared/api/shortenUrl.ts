import { sqliteDb } from "../utils/db";

/**
 * Asigns a unique shortened URL to the specified URL
 *
 * If the provided URL has already been shortened, this should return the
 * original shortened URL
 *
 * @param   url     The URL to shorten
 * @returns The shortened version of the URL. This should follow the format
 * `http://localhost:3030/[a-zA-Z0-9]{6,12}`
 */
export const shortenUrl = async (url: string) => {
  const db = await sqliteDb();
  // TODO: add shortening logic here

  //fetch existing shortened URL
  const shortenedUrl = await db.get("SELECT shortened FROM urls WHERE original = ?", url);

  if (shortenedUrl) {
    return shortenedUrl;
  }

  const shortenedUrlFormat = generateURLFormat();
  console.log(shortenedUrlFormat);

  const generatedUrl = `http://localhost:3000/${shortenedUrlFormat}`;

  await db.run("INSERT INTO urls (original, shortened) VALUES (?, ?)", url, generatedUrl);

  return generatedUrl;
};


const generateURLFormat = () => {
  const charLength = Math.floor(Math.random() * (12 - 6 + 1)) + 6;
  // Regex for shortened url
  const regex = /^[a-zA-Z0-9]+$/;

  let Id = "";

  while (Id.length < charLength) {
    const randChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    if (regex.test(randChar)) {
      Id += randChar;
    }
  }

  return Id;
};
