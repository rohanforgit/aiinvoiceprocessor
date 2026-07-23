import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://msxcgmgkazrboryzmsiv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeGNnbWdrYXpyYm9yeXptc2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3ODA0MzcsImV4cCI6MjEwMDM1NjQzN30.JsDJKZg2STbrTGf_NEgtzAmMZ-mmqIo5v0laLVobypg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
