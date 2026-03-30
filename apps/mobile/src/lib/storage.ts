import AsyncStorage from 'expo-sqlite/kv-store';
import { SessionUser } from './types';

const ACCESS_TOKEN_KEY = 'sidra_access_token';
const SESSION_USER_KEY = 'sidra_session_user';

export async function saveSession(accessToken: string, user: SessionUser) {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await AsyncStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
}

export async function getAccessToken() {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const raw = await AsyncStorage.getItem(SESSION_USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function clearSession() {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(SESSION_USER_KEY);
}