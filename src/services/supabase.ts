// src/services/supabase.js
import { createClient } from "@supabase/supabase-js";
console.log("VITE_SUPABASE_URL:", import.meta.env);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
// const supabaseToken = import.meta.env.VITE_SUPABASE_TOKEN;
// const supabaseKeySecret = import.meta.env.VITE_SUPABASE_ACCESS_KEY_SECRET;
// const supabaseKeyId = import.meta.env.VITE_SUPABASE_ACCESS_KEY_ID;

export const supabase = createClient(supabaseUrl, supabaseKey);
// export const supabase = createClient(supabaseUrl, supabaseKeySecret, {accessToken: supabaseToken, global: {headers: {'x-access-key-id': supabaseKeyId}}});
