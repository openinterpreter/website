const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const BUCKET = "video";
const FOLDER = "workstation";

/**
 * Get the public URL for a file in Supabase storage
 */
export function getStorageUrl(filename: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${FOLDER}/${filename}`;
}

/**
 * Video assets stored in Supabase
 */
export const videos = {
  hero: getStorageUrl("hero-placeholder.mp4"),
};
