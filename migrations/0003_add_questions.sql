-- Migration number: 0003 	 2026-09-07T11:11:19.406Z
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT (strftime ('%Y-%m-%dT%H:%M:%SZ', 'now')),
  rating INTEGER NOT NULL
);
