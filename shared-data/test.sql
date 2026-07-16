-- =========================================================================
-- 🧪 LMS RLS ISOLATION TEST SUITE (Automated Assertions)
-- =========================================================================

-- Clean up previous test data to ensure a completely clean state
TRUNCATE TABLE finished_items CASCADE;
TRUNCATE TABLE learners CASCADE;

-- 1. Setup Test Users
INSERT INTO learners (id, email) VALUES (1, 'user_a@example.com') ON CONFLICT (id) DO NOTHING;
INSERT INTO learners (id, email) VALUES (2, 'user_b@example.com') ON CONFLICT (id) DO NOTHING;

DO $$
DECLARE
    v_count INTEGER;
BEGIN
    -- ---------------------------------------------------------------------
    -- 👤 SCENARIO 1: SIMULATE USER A SESSION
    -- ---------------------------------------------------------------------
    -- Set session context using secure set_config (persists across transaction)
    PERFORM set_config('app.current_learner_id', '1', false);

    -- Test A.1: User A inserts their own item (Should SUCCESS)
    INSERT INTO finished_items (learner_id, item_id) VALUES (1, 'lesson_html_01');
    
    -- Assert User A can see exactly 1 record (their own)
    SELECT count(*) INTO v_count FROM finished_items;
    ASSERT v_count = 1, 'Assertion Failed: User A should see exactly 1 record.';

    -- Test A.2: User A tries to insert data for User B (Should FAIL via RLS WITH CHECK)
    BEGIN
        INSERT INTO finished_items (learner_id, item_id) VALUES (2, 'lesson_html_01');
        -- If it reaches here, the test failed because the insert was allowed!
        RAISE EXCEPTION 'Assertion Failed: User A bypassed RLS and inserted data for User B.';
    EXCEPTION
        WHEN insufficient_privilege THEN
            -- Caught expected RLS violation error (Postgres error code 42501)
            -- This means RLS correctly blocked the transaction!
            RAISE NOTICE '✅ Test A.2 Passed: RLS successfully blocked User A from inserting User B''s record.';
    END;


    -- ---------------------------------------------------------------------
    -- 👤 SCENARIO 2: SIMULATE USER B SESSION
    -- ---------------------------------------------------------------------
    PERFORM set_config('app.current_learner_id', '2', false);

    -- Test B.1: User B tries to read User A's data (Should return 0 rows)
    SELECT count(*) INTO v_count FROM finished_items;
    ASSERT v_count = 0, 'Assertion Failed: User B should see 0 rows belonging to User A.';

    -- Test B.2: User B tries to update User A's record (Should affect 0 rows)
    UPDATE finished_items SET item_id = 'hacked_lesson' WHERE learner_id = 1;
    GET DIAGNOSTICS v_count = ROW_COUNT;
    ASSERT v_count = 0, 'Assertion Failed: User B was able to update User A''s record.';


    -- ---------------------------------------------------------------------
    -- 🚫 SCENARIO 3: SIMULATE UNAUTHENTICATED SESSION
    -- ---------------------------------------------------------------------
    PERFORM set_config('app.current_learner_id', '', false);

    -- Test C.1: Unauthenticated query (Should return 0 rows)
    SELECT count(*) INTO v_count FROM finished_items;
    ASSERT v_count = 0, 'Assertion Failed: Unauthenticated user should see 0 rows.';

    RAISE NOTICE '🎉 SUCCESS: All automated RLS isolation tests passed flawlessly!';
END $$;