import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadToSupabase = async (file) => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`avatars/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true, 
      });

    if (error) {
      throw error;
    }

    
    const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(data.path);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
};