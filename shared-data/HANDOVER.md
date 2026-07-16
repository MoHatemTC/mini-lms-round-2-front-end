# LMS Shared Progress - Handover Note (v1.1.0)

This document serves as the official integration contract and operations guide between the **Shared Data Architecture (Storage)** and the **Dashboard/Profile/Certificates teams (Slot 3)**.

---

## 📌 1. Read/Write Contract (Who does what?)

- **Writer (My System):** Tracks and saves records when a learner finishes an item, attempts a quiz, submits a task, or writes a review.
- **Readers (Slot 3 & Dashboard):** Have read-only access to compiled learner history to build profile statistics, progress charts, and issue certificates.

---

## 🔒 2. Data Isolation & Security Assumption

- **Isolation Level:** Securely partitioned per learner using PostgreSQL **Row-Level Security (RLS)**.
- **Mechanism:** Authentication context is stored in the database session using the local session variable `app.current_learner_id`, which is set by trusted backend authentication handlers (not by user input).
- **Unauthenticated Access:** Requests without a valid session context are automatically blocked.

---

## 🛠️ 3. Operations & Setup Guide

### Migration Order

1. Create the `learners` table.
2. Create learner-owned tables:
   - `finished_items`
   - `quiz_attempts`
   - `task_submissions`
   - `reviews`
   - `achievements`
3. Create indexes and helper functions.
4. Enable and configure Row-Level Security (RLS) policies.

### Setup

Run the following command to apply the schema:

```bash
psql -h <host> -U <username> -d <database_name> -f schema.sql
```

### Rollback

If you need to revert the deployment:

```sql
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS task_submissions CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS finished_items CASCADE;
DROP TABLE IF EXISTS learners CASCADE;

DROP FUNCTION IF EXISTS get_current_learner_id CASCADE;
```

---

## 🧪 4. Test Commands & Validation

Run the automated security tests:

```bash
psql -h <host> -U <username> -d <database_name> -f test.sql
```

### Expected Output

```text
NOTICE:  ✅ Test A.2 Passed: RLS successfully blocked User A from inserting User B's record.
NOTICE:  🎉 SUCCESS: All automated RLS isolation tests passed flawlessly!
```

> **Note:** If any assertion fails, PostgreSQL immediately throws an exception and stops executing the script, ensuring strict verification.

---

## 📘 5. For Developers: Adding a New Learner-Related Table

When adding a new learner-related table (for example `learner_notes`), follow these steps to preserve the security model.

### 1. Create the table

```sql
CREATE TABLE IF NOT EXISTS learner_notes (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
    note_text TEXT NOT NULL
);
```

### 2. Create an index on the foreign key

```sql
CREATE INDEX IF NOT EXISTS idx_learner_notes_learner_id
ON learner_notes(learner_id);
```

### 3. Enable and FORCE Row-Level Security

```sql
ALTER TABLE learner_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_notes FORCE ROW LEVEL SECURITY;
```

> **Important:** `FORCE ROW LEVEL SECURITY` prevents the table owner from bypassing RLS policies and should always be enabled on learner-owned tables.

### 4. Create the RLS policy

```sql
CREATE POLICY learner_crud_policy
ON learner_notes
FOR ALL
USING (learner_id = get_current_learner_id())
WITH CHECK (learner_id = get_current_learner_id());
```

---

## ⚠️ 6. Known Limitations

- RLS depends on the backend correctly setting the session variable `app.current_learner_id` before executing database queries.
- PostgreSQL superusers can bypass RLS by design. Enabling `FORCE ROW LEVEL SECURITY` prevents the table owner from bypassing RLS, but it does **not** restrict true superusers.
