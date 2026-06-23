-- RLS policies
CREATE POLICY "Vocabulary public read" ON vocabulary FOR SELECT USING (true);
CREATE POLICY "Vocabulary admin insert" ON vocabulary FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Vocabulary admin update" ON vocabulary FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Vocabulary admin delete" ON vocabulary FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Quiz public read" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "User progress own" ON user_progress FOR ALL USING (auth.uid() = user_id);
