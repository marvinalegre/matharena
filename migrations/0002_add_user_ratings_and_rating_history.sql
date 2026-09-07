-- Migration number: 0002 	 2026-09-07T10:19:58.720Z
ALTER TABLE users
ADD COLUMN rating INTEGER NOT NULL DEFAULT 800;

CREATE TABLE rating_history (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
