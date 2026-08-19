const SUPABASE_URL = "https://gglfhhuybpiyjkvowhsv.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_ms4EGg7ejEh7B3SHcEhp0Q_iucletv2";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Belipsa Supabase connected.");