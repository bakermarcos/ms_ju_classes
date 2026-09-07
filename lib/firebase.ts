import { defaultConfig, type Plan, type SiteConfig } from './config';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** Sem credenciais o site roda inteiro nos valores base — nada quebra. */
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const isPlan = (value: unknown): value is Plan => {
  if (typeof value !== 'object' || value === null) return false;
  const plan = value as Record<string, unknown>;
  return (
    typeof plan.title === 'string' &&
    typeof plan.price === 'string' &&
    typeof plan.modality === 'string' &&
    typeof plan.messageKey === 'string'
  );
};

/** Só aceita campos com o formato esperado; o resto cai no valor base. */
const merge = (remote: Record<string, unknown>): SiteConfig => {
  const plans = (value: unknown, fallback: Plan[]) =>
    Array.isArray(value) && value.length > 0 && value.every(isPlan) ? (value as Plan[]) : fallback;
  const text = (value: unknown, fallback: string) =>
    typeof value === 'string' && value.trim() ? value : fallback;

  return {
    kidsPlans: plans(remote.kidsPlans, defaultConfig.kidsPlans),
    adultPlans: plans(remote.adultPlans, defaultConfig.adultPlans),
    enrollmentFee: text(remote.enrollmentFee, defaultConfig.enrollmentFee),
    classDuration: text(remote.classDuration, defaultConfig.classDuration),
    location: text(remote.location, defaultConfig.location),
  };
};

/**
 * O SDK do Firestore pesa ~550 kB, então entra por import dinâmico: fica fora
 * do bundle inicial e nem chega a ser baixado quando não há credenciais.
 */
export const fetchSiteConfig = async (): Promise<SiteConfig> => {
  if (!isFirebaseConfigured) return defaultConfig;

  try {
    const [{ initializeApp }, { getFirestore, doc, getDoc }] = await Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
    ]);

    const snapshot = await getDoc(doc(getFirestore(initializeApp(firebaseConfig)), 'config', 'site'));
    if (!snapshot.exists()) return defaultConfig;
    return merge(snapshot.data() as Record<string, unknown>);
  } catch (error) {
    console.warn('[config] Firestore indisponível, usando valores base.', error);
    return defaultConfig;
  }
};
