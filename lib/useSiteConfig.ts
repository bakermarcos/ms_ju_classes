import { createContext, useContext, useEffect, useState } from 'react';
import { defaultConfig, type SiteConfig } from './config';
import { fetchSiteConfig } from './firebase';

export const SiteConfigContext = createContext<SiteConfig>(defaultConfig);

export const useSiteConfig = () => useContext(SiteConfigContext);

/** Pinta com os valores base no primeiro frame e troca quando o Firestore responde. */
export const useRemoteSiteConfig = (): SiteConfig => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    let active = true;
    fetchSiteConfig().then((remote) => {
      if (active) setConfig(remote);
    });
    return () => {
      active = false;
    };
  }, []);

  return config;
};
