// ─────────────────────────────────────────
//  FarmTracker — Supabase Configuration
// ─────────────────────────────────────────
//  1. Go to https://supabase.com/dashboard
//  2. Open your project → Settings → API
//  3. Copy your Project URL and anon/public key
//  4. Paste them below

const SUPABASE_URL = '';

const SUPABASE_ANON_KEY = '';

// Initialize the Supabase client
// (requires the Supabase CDN script to be loaded before this file)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
