import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://wetyysiocjbxgcnovaga.supabase.co/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldHl5c2lvY2pieGdjbm92YWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MTQ1NTYsImV4cCI6MjA5NTE5MDU1Nn0.nn8yBt7Hdm7vBVSzzDD53nIsLN_yzljdBx4TB46EyoA'
export const supabase = createClient(supabaseUrl, supabaseKey)