import { sqliteDb } from "../utils/db";

/**
 * Translates a shortened URL into the original URL that generated it
 * @param   shortenedUrl    The shortened URL to resolve back
 * @returns The original URL that generated the provided shortened URL
 */
export const resolveShortenedUrl = async (shortenedUrl: string) => {
  const db = await sqliteDb();
  // TODO: return the shortened version of the url
  
  const resolvedUrl = await db.get("SELECT original FROM urls WHERE shortened = ?", shortenedUrl);
  console.log(resolvedUrl)
  if (resolvedUrl) {
    return resolvedUrl.original;
  } else {
    throw new Error("Shortened URL not found");
  }
};
