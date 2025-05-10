import { useState } from 'react';
import { supabase } from '../../supabaseClient';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`avatars/${file.name}`, file, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error(error);
      alert('Failed to upload file.');
    } else {
      const { publicUrl } = supabase.storage.from('avatars').getPublicUrl(data.path);
      setUploadUrl(publicUrl);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadUrl && (
        <div>
          <p>File uploaded successfully:</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            {uploadUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;