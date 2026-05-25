/**
 * Seed script to create the default admin user.
 * Run with: node database/seed-admin.js
 * 
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';
  const role = process.argv[4] || 'admin';

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('admins')
    .upsert({ username, password_hash: passwordHash, role })
    .select()
    .single();

  if (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }

  console.log(`✅ Admin user created/updated:`);
  console.log(`   Username: ${username}`);
  console.log(`   Role: ${role}`);
  console.log(`   ID: ${data.id}`);
  console.log('\n⚠️  Change the default password in production!');
}

seedAdmin();
