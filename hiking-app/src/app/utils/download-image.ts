import { createClient } from "./supabase/client";
export async function downloadImage(path: string): Promise<string | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.log("Error downloading image: ", error);
    return null; // Return `null` if there's an error
  }
}
