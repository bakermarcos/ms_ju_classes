import type { MessageKey } from './whatsapp';

export const INSTAGRAM_URL = 'https://www.instagram.com/msjutamietti/';

export type Plan = {
  title: string;
  price: string;
  modality: string;
  messageKey: MessageKey;
  description?: string;
  featured?: boolean;
};

export type SiteConfig = {
  kidsPlans: Plan[];
  adultPlans: Plan[];
  enrollmentFee: string;
  classDuration: string;
  location: string;
};

/**
 * Valores base. Servem como fallback quando o Firestore não responde
 * (offline, credenciais ausentes, primeiro paint). O documento
 * `config/site` no Firestore sobrescreve estes valores em runtime.
 */
export const defaultConfig: SiteConfig = {
  kidsPlans: [
    { title: '1x por Semana', price: 'R$ 680,00', modality: 'Presencial', messageKey: 'kids_1x' },
    { title: '2x por Semana', price: 'R$ 960,00', modality: 'Presencial', messageKey: 'kids_2x', featured: true },
    { title: '3x por Semana', price: 'R$ 1.340,00', modality: 'Presencial', messageKey: 'kids_3x' },
    {
      title: '2x por Semana',
      price: 'R$ 880,00',
      modality: 'Online + kit em casa',
      messageKey: 'kids_online_kit',
      description: 'Material físico entregue em casa a cada nova unidade',
    },
  ],
  adultPlans: [
    { title: '1x por Semana', price: 'R$ 490,00', modality: 'Online', messageKey: 'adults_online_1x' },
    { title: '2x por Semana', price: 'R$ 730,00', modality: 'Online', messageKey: 'adults_online_2x', featured: true },
  ],
  enrollmentFee: 'R$ 200,00',
  classDuration: '1 hora e 10 minutos',
  location: 'Lagoa Santa/MG',
};
