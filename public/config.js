// ─────────────────────────────────────────
//  FarmTracker — Supabase Configuration
// ─────────────────────────────────────────
//  1. Go to https://supabase.com/dashboard
//  2. Open your project → Settings → API
//  3. Copy your Project URL and anon/public key
//  4. Paste them below
 
const SUPABASE_URL  = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-public-key-here';
 
// Initialize the Supabase client
// (requires the Supabase CDN script to be loaded before this file)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 