import { sqliteDb } from "../utils/db";

/**
 * generates the list of all urls that have been shortened with this shortener.
 * @returns a list of paired URLs, represented by the `UrlPair` type
 */
export const getAllUrls = async (): Promise<UrlPair[]> => {
  const db = await sqliteDb();
  try {
    const urls: UrlPair[] = await db.all("SELECT original, shortened FROM urls");
    return urls;
  } catch (error) {
    console.error("Failed to fetch shortened URLs", error);
    throw error;
  }
};

type UrlPair = {
  original: string;
  shortened: string;
};
