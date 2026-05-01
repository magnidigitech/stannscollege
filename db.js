const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://dbwjqdkocxpyuwqwcnub.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRid2pxZGtvY3hweXV3cXdjbnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjMxMTgsImV4cCI6MjA5MzE5OTExOH0.ATYRj-0CR8I0TnBoDmuPDxMBRnjAOLnBKWbM0w4B5E0'
);

module.exports = supabase;
