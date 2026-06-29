/**
 * Sahte (mock) kimlik doğrulama — prototip için backend yok.
 *
 * Oturum iki yerde işaretlenir:
 *  - cookie `berber_panel_auth=1` (7 gün) — orta vadede middleware/SSR kapısı için hazır dursun.
 *  - localStorage flag — istemci tarafı hızlı kontrol.
 *
 * FAZ 2 DİKİŞİ: Bu üç fonksiyonun gövdesi Supabase Auth ile değişir
 * (signIn → signInWithPassword, signOut → auth.signOut, isAuthed → getSession).
 * İmzalar sabit kalır; çağıran sayfaların değişmesi gerekmez.
 */

export const DEMO_USER = {
  email: "berber@demo.com",
  password: "berber123",
} as const;

const COOKIE_KEY = "berber_panel_auth";
const STORAGE_KEY = "berber_panel_auth";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

/** Demo kimlik bilgileriyle giriş dener. Başarılıysa oturumu işaretler. */
export function signIn(email: string, password: string): boolean {
  const ok =
    email.trim().toLowerCase() === DEMO_USER.email &&
    password === DEMO_USER.password;
  if (!ok) return false;

  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_KEY}=1; path=/; max-age=${MAX_AGE}; samesite=lax`;
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, "1");
  }
  return true;
}

/** Oturumu kapatır — cookie ve localStorage işaretini temizler. */
export function signOut(): void {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
  }
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

/** İstemci tarafında oturum açık mı? SSR'de daima false (guard). */
export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}
