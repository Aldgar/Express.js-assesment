import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or API Key is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Define and export the uploadToSupabase function
export const uploadToSupabase = async (file) => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`avatars/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true, // Overwrite if the file already exists
      });

    if (error) {
      throw error;
    }

    // Get the public URL of the uploaded file
    const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(data.path);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
};