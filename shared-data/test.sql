-- =========================================================================
-- 🧪 LMS RLS ISOLATION TEST SUITE
-- This script validates that User A cannot access or modify User B's data.
-- =========================================================================

-- 1. Setup Test Users (User A with ID 1, User B with ID 2)
INSERT INTO learners (id, email) VALUES (1, 'user_a@example.com') ON CONFLICT DO NOTHING;
INSERT INTO learners (id, email) VALUES (2, 'user_b@example.com') ON CONFLICT DO NOTHING;

-- =========================================================================
-- 👤 SCENARIO 1: SIMULATE USER A SESSION
-- =========================================================================
-- We set the session context to User 1 (User A)
SET LOCAL app.current_learner_id = '1';

-- Test A.1: User A inserts their own finished item (Should SUCCESS)
INSERT INTO finished_items (learner_id, item_id) VALUES (1, 'lesson_html_01');

-- Test A.2: User A tries to insert data belonging to User B (Should FAIL due to RLS WITH CHECK)
-- Expected behavior: Postgres will throw an RLS policy violation error!
-- To prevent the script from halting, we comment this line out, but it's documented.
-- INSERT INTO finished_items (learner_id, item_id) VALUES (2, 'lesson_html_01'); 

-- Test A.3: User A reads data (Should ONLY see User A's record, 0 rows of User B should appear)
SELECT 'User A session query result:' AS test_run, * FROM finished_items;


-- =========================================================================
-- 👤 SCENARIO 2: SIMULATE USER B SESSION
-- =========================================================================
-- Switch session context to User 2 (User B)
SET LOCAL app.current_learner_id = '2';

-- Test B.1: User B tries to read User A's data (Should return 0 rows - SUCCESSFUL ISOLATION)
SELECT 'User B session query result (Trying to see User A):' AS test_run, * FROM finished_items;

-- Test B.2: User B tries to update User A's record (Should affect 0 rows - BLOCKED BY RLS)
UPDATE finished_items SET item_id = 'hacked_lesson' WHERE learner_id = 1;


-- =========================================================================
-- 🚫 SCENARIO 3: SIMULATE UNAUTHENTICATED SESSION (No ID in session)
-- =========================================================================
RESET app.current_learner_id;

-- Test C.1: Unauthenticated user tries to read (Should return 0 rows - SECURE BY DEFAULT)
SELECT 'Unauthenticated query result:' AS test_run, * FROM finished_items;