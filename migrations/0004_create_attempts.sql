-- Migration number: 0004 	 2026-09-12T04:53:05.794Z
CREATE TABLE attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_code TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  user_rating INTEGER NOT NULL,
  is_correct INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (question_code) REFERENCES questions (code)
);
