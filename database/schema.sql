-- MakiPass Database Schema (Supabase/PostgreSQL)
-- Run this in the Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins table (for admin/validator login with username/password)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'validator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Missions table
CREATE TABLE IF NOT EXISTS missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  xp_reward INTEGER NOT NULL DEFAULT 100,
  type VARCHAR(50) NOT NULL DEFAULT 'scan' CHECK (type IN ('scan', 'chain', 'location', 'daily', 'weekly')),
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QR Codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(255) UNIQUE NOT NULL,
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL DEFAULT 'static' CHECK (type IN ('static', 'chain')),
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scan logs table
CREATE TABLE IF NOT EXISTS scan_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL,
  qr_code_id UUID REFERENCES qr_codes(id),
  mission_id UUID REFERENCES missions(id),
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES admins(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  rejection_reason TEXT
);

-- Player missions (tracking completion)
CREATE TABLE IF NOT EXISTS player_missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL,
  mission_id UUID REFERENCES missions(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(player_id, mission_id)
);

-- Battlepass tiers
CREATE TABLE IF NOT EXISTS battlepass_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_number INTEGER UNIQUE NOT NULL,
  xp_required INTEGER NOT NULL,
  reward_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player progress
CREATE TABLE IF NOT EXISTS player_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID UNIQUE NOT NULL,
  xp INTEGER DEFAULT 0,
  current_tier INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reward claims
CREATE TABLE IF NOT EXISTS reward_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL,
  tier_number INTEGER NOT NULL,
  claimed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id, tier_number)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_scan_logs_player ON scan_logs(player_id);
CREATE INDEX IF NOT EXISTS idx_scan_logs_status ON scan_logs(status);
CREATE INDEX IF NOT EXISTS idx_scan_logs_verified ON scan_logs(verified);
CREATE INDEX IF NOT EXISTS idx_qr_codes_mission ON qr_codes(mission_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_code ON qr_codes(code);
CREATE INDEX IF NOT EXISTS idx_player_missions_player ON player_missions(player_id);
CREATE INDEX IF NOT EXISTS idx_player_progress_player ON player_progress(player_id);

-- Seed a default admin account (password: admin123)
-- IMPORTANT: Change this password in production!
-- The hash below corresponds to 'admin123' using bcrypt
INSERT INTO admins (username, password_hash, role) VALUES
  ('admin', '$2b$10$rQZ8kHzMFQwLqP0L2uXjZOhXo5L7NxX6xJq9c3Km/xY8X8T1W5Mvy', 'admin')
ON CONFLICT (username) DO NOTHING;
