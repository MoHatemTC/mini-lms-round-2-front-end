# LMS Shared Progress - Handover Note (v1.1.0)

This document serves as the official integration contract and operations guide between the **Shared Data Architecture (Storage)** and the **Dashboard/Profile/Certificates teams (Slot 3)**.

---

## 1. Read/Write Contract (Who does what?)

* **Writer (My System):** Tracks and saves records when a learner finishes an item, attempts a quiz, submits a task, or writes a review.
* **Readers (Slot 3 & Dashboard):** Have read-only access to compiled learner history to build profile statistics, progress charts, and issue certificates.

## 2. Data Isolation & Security Assumption

* **Isolation Level:** "Securely partitioned per learner" is fully enforced at the database layer using PostgreSQL **Row-Level Security (RLS)**.
* **Mechanism:** Authentication context is set directly in the DB session via the local session variable `app.current_learner_id` from trusted backend authentication handlers, NOT via user-submitted fields.
* **Unauthenticated Access:** Requests with empty or absent session variables are automatically blocked.

---

## 3. Operations & Setup Guide

### Migration Order

1. Execute `learners` table creation (Master table).
2. Execute learner-owned tables: `finished_items`, `quiz_attempts`, `task_submissions`, `reviews`, and `achievements`.
3. Create indexes and apply RLS helper functions.
4. Apply the security policies on all tables.

### Setup Steps

To load the schema onto a Postgres instance, execute the following command:

```bash
psql -h <host> -U <username> -d <database_name> -f schema.sql
```

### Rollback Approach

If you need to revert this deployment safely without affecting other schemas:

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

## 4. Test Commands & Validation

To execute evidence-based testing of user isolation and security boundaries:

```bash
psql -h <host> -U <username> -d <database_name> -f test.sql
```

**Expected Output:** User B queries should return empty datasets when querying User A's data, and unauthorized database operations should trigger an RLS policy violation error.

---

## 5. For Developers: Adding a New Learner-Related Table

If you need to add a new learner-related table (e.g., `learner_notes`), follow this checklist to maintain security standards:

### 1. Create Table with FK constraint:

```sql
CREATE TABLE IF NOT EXISTS learner_notes (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
    note_text TEXT NOT NULL
);
```

### 2. Create Index on FK:

```sql
CREATE INDEX IF NOT EXISTS idx_learner_notes_learner_id ON learner_notes(learner_id);
```

### 3. Enable Row-Level Security (RLS):

```sql
ALTER TABLE learner_notes ENABLE ROW LEVEL SECURITY;
```

### 4. Create the CRUD Isolation Policy:

```sql
CREATE POLICY learner_crud_policy ON learner_notes
FOR ALL
USING (learner_id = get_current_learner_id())
WITH CHECK (learner_id = get_current_learner_id());
```

---

## 6. Known Limitations

* Database RLS relies entirely on the API gateway/backend correctly setting the session context variable `app.current_learner_id` before database query execution.
* Database administrators (Superusers) naturally bypass RLS policies by default.