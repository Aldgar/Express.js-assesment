import express from 'express';
import multer from 'multer';
import { supabase } from '../utils/supabaseClient.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

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

    res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default router;