// Authentification temporaire frontend uniquement.
// À remplacer par une vraie authentification sécurisée côté serveur avant production.
// Version développement uniquement. Les mots de passe ne doivent jamais être stockés
// en clair en production. À remplacer par Supabase Auth ou Firebase Auth avant lancement.

export const ACCOUNT_KEY = 'aixoria_life_account'
export const SESSION_KEY = 'aixoria_life_session'

export function loadAccount() {
  try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY)) || null } catch { return null }
}

export function saveAccount(account) {
  try { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account)) } catch { /* ignore */ }
}

export function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null } catch { return null }
}

export function saveSession(email) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      email,
      loggedIn: true,
      loginAt: new Date().toISOString(),
    }))
  } catch { /* ignore */ }
}

export function clearSession() {
  try { localStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
}

export function isLoggedIn() {
  return loadSession()?.loggedIn === true
}
