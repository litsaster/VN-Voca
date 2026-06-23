-- ============================================
-- VN Voca – Supabase Schema
-- ============================================

-- 1. Vocabulary table
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('food', 'drink', 'pronoun')),
  vietnamese TEXT NOT NULL,
  english_name TEXT NOT NULL,
  english_hint TEXT DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  "group" TEXT DEFAULT '',
  gender TEXT DEFAULT 'neutral' CHECK (gender IN ('male', 'female', 'neutral')),
  address TEXT DEFAULT '',
  context TEXT DEFAULT '',
  pair TEXT DEFAULT '',
  example TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Quiz questions table
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INT NOT NULL,
  explanation TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. User progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_slug TEXT NOT NULL REFERENCES vocabulary(slug) ON DELETE CASCADE,
  learned BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, word_slug)
);

-- Enable RLS
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Vocabulary public read" ON vocabulary FOR SELECT USING (true);
CREATE POLICY "Vocabulary admin insert" ON vocabulary FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Vocabulary admin update" ON vocabulary FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Vocabulary admin delete" ON vocabulary FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Quiz public read" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "User progress own" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
