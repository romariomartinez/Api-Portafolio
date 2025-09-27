const supabase = require("../config/supabase");
const { v4: uuidv4 } = require("uuid");

async function uploadToSupabase(file, folder = "uploads") {
  if (!file) return null;

  const fileExt = file.originalname.split(".").pop();
  const fileName = `${folder}/${uuidv4()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}

module.exports = uploadToSupabase;
