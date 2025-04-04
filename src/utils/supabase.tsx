
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fcjbnmhbjolybbkervgg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjamJubWhiam9seWJia2VydmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MzcyNTQsImV4cCI6MjA1ODUxMzI1NH0.mFa5W8ixlKQtaNm_EdGFg3IuooF95Xcn-ArPx_vX4mI"

export const supabase = createClient(supabaseUrl, supabaseKey);
        