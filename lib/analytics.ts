/**
 * Google Analytics 4 via Firebase.
 *
 * Só entra em ação quando `VITE_FIREBASE_MEASUREMENT_ID` existe. Sem o ID, todas
 * as funções viram no-op e o SDK de analytics nem é baixado — o site continua
 * idêntico. O carregamento é dinâmico e depois do primeiro paint, para não
 * competir com a renderização.
 */

const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

export const isAnalyticsConfigured = Boolean(measurementId);

/** Respeita a escolha de quem não quer ser rastreado. */
const optedOut = () => {
  if (typeof navigator === 'undefined') return true;
  const dnt = navigator.doNotTrack ?? (window as { doNotTrack?: string }).doNotTrack;
  return dnt === '1' || dnt === 'yes';
};

type Params = Record<string, string | number | boolean>;

let logEventFn: ((name: string, params?: Params) => void) | null = null;
const pending: Array<[string, Params | undefined]> = [];

export const initAnalytics = async () => {
  if (!isAnalyticsConfigured || optedOut()) return;

  try {
    const [{ initializeApp, getApps }, analytics] = await Promise.all([
      import('firebase/app'),
      import('firebase/analytics'),
    ]);

    if (!(await analytics.isSupported())) return;

    // O módulo do Firestore pode já ter criado o app; reaproveita em vez de duplicar.
    const app = getApps()[0] ??
      initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId,
      });

    const instance = analytics.getAnalytics(app);

    // Nada de sinais para publicidade: só medição de uso do site.
    analytics.setAnalyticsCollectionEnabled(instance, true);

    logEventFn = (name, params) => analytics.logEvent(instance, name, params);

    for (const [name, params] of pending.splice(0)) logEventFn(name, params);
  } catch (error) {
    console.warn('[analytics] indisponível, seguindo sem medição.', error);
  }
};

export const trackEvent = (name: string, params?: Params) => {
  if (!isAnalyticsConfigured || optedOut()) return;
  if (logEventFn) logEventFn(name, params);
  else if (pending.length < 20) pending.push([name, params]);
};
