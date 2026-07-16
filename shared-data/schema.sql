-- =========================================================================
-- 1. Master Learners Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS learners (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 2. Finished Items Table (linked to Learners)
-- =========================================================================
CREATE TABLE IF NOT EXISTS finished_items (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_learner_finished FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
    CONSTRAINT unique_learner_item UNIQUE (learner_id, item_id)
);
-- Index added for high performance when querying by learner
CREATE INDEX IF NOT EXISTS idx_finished_items_learner_id ON finished_items(learner_id);

-- =========================================================================
-- 3. Quiz Attempts Table (linked to Learners)
-- =========================================================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL,
    quiz_id VARCHAR(50) NOT NULL,
    score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
    is_passed BOOLEAN NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_learner_quiz FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE
);
-- Index added for high performance when querying by learner
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_learner_id ON quiz_attempts(learner_id);

-- =========================================================================
-- 4. Task Submissions Table (linked to Learners)
-- =========================================================================
CREATE TABLE IF NOT EXISTS task_submissions (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL,
    task_id VARCHAR(50) NOT NULL,
    submission_url TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_learner_task FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE
);
-- Index added for high performance when querying by learner
CREATE INDEX IF NOT EXISTS idx_task_submissions_learner_id ON task_submissions(learner_id);

-- =========================================================================
-- 5. Reviews Table (linked to Learners)
-- =========================================================================
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_learner_review FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE
);
-- Index added for high performance when querying by learner
CREATE INDEX IF NOT EXISTS idx_reviews_learner_id ON reviews(learner_id);

-- =========================================================================
-- 6. Achievements and Certificates Table (linked to Learners)
-- =========================================================================
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL,
    achievement_type VARCHAR(30) NOT NULL CHECK (achievement_type IN ('Certificate', 'Badge')),
    title VARCHAR(100) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_learner_achievement FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE
);
-- Index added for high performance when querying by learner
CREATE INDEX IF NOT EXISTS idx_achievements_learner_id ON achievements(learner_id);


-- =========================================================================
-- 🔒 DATABASE SECURITY & ISOLATION (Row-Level Security - RLS)
-- =========================================================================

-- Enable and FORCE RLS on all sensitive tables (Force applies RLS even to the table Owner/Superuser)
ALTER TABLE finished_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE finished_items FORCE ROW LEVEL SECURITY;

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts FORCE ROW LEVEL SECURITY;

ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions FORCE ROW LEVEL SECURITY;

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews FORCE ROW LEVEL SECURITY;

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements FORCE ROW LEVEL SECURITY;

-- Helper function to safely get authenticated user context from database session
CREATE OR REPLACE FUNCTION get_current_learner_id() 
RETURNS INTEGER AS $$
BEGIN
    RETURN NULLIF(current_setting('app.current_learner_id', true), '')::integer;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create ALL-CRUD Isolation Policies (Covers SELECT, INSERT, UPDATE, DELETE)
DO $$ 
BEGIN
    -- finished_items policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'learner_crud_policy' AND tablename = 'finished_items') THEN
        CREATE POLICY learner_crud_policy ON finished_items FOR ALL 
        USING (learner_id = get_current_learner_id()) 
        WITH CHECK (learner_id = get_current_learner_id());
    END IF;

    -- quiz_attempts policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'learner_crud_policy' AND tablename = 'quiz_attempts') THEN
        CREATE POLICY learner_crud_policy ON quiz_attempts FOR ALL 
        USING (learner_id = get_current_learner_id()) 
        WITH CHECK (learner_id = get_current_learner_id());
    END IF;

    -- task_submissions policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'learner_crud_policy' AND tablename = 'task_submissions') THEN
        CREATE POLICY learner_crud_policy ON task_submissions FOR ALL 
        USING (learner_id = get_current_learner_id()) 
        WITH CHECK (learner_id = get_current_learner_id());
    END IF;

    -- reviews policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'learner_crud_policy' AND tablename = 'reviews') THEN
        CREATE POLICY learner_crud_policy ON reviews FOR ALL 
        USING (learner_id = get_current_learner_id()) 
        WITH CHECK (learner_id = get_current_learner_id());
    END IF;

    -- achievements policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'learner_crud_policy' AND tablename = 'achievements') THEN
        CREATE POLICY learner_crud_policy ON achievements FOR ALL 
        USING (learner_id = get_current_learner_id()) 
        WITH CHECK (learner_id = get_current_learner_id());
    END IF;
END $$;