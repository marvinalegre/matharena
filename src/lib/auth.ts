interface HashedPassword {
  salt: string;
  hash: string;
}

export async function hash(password: string): Promise<HashedPassword> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100000 },
    key,
    256,
  );
  return {
    salt: btoa(String.fromCharCode(...salt)),
    hash: btoa(String.fromCharCode(...new Uint8Array(bits))),
  };
}

export async function verify(
  password: string,
  savedSalt: string,
  savedHash: string,
): Promise<boolean> {
  const enc = new TextEncoder();
  const salt = Uint8Array.from(atob(savedSalt), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100000 },
    key,
    256,
  );
  return btoa(String.fromCharCode(...new Uint8Array(bits))) === savedHash;
}
