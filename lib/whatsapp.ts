const WHATSAPP_NUMBER = "5531986885310";
const BASE_URL = "https://wa.me/";

export const generateWhatsAppLink = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `${BASE_URL}${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const messages = {
  general: "Olá! Gostaria de saber mais sobre as aulas de inglês.",
  kids_1x: "Olá! Tenho interesse no plano para crianças de 1x por semana.",
  kids_2x: "Olá! Tenho interesse no plano para crianças de 2x por semana.",
  kids_3x: "Olá! Tenho interesse no plano para crianças de 3x por semana.",
  kids_online: "Olá! Tenho interesse no plano online para crianças de 2x por semana.",
  adults_online_1x: "Olá! Gostaria de saber mais sobre o plano para adultos de 1x por semana (Online).",
  adults_online_2x: "Olá! Gostaria de saber mais sobre o plano para adultos de 2x por semana (Online).",
  adults_online_3x: "Olá! Gostaria de saber mais sobre o plano para adultos de 3x por semana (Online).",
  adults_presencial_1x: "Olá! Gostaria de saber mais sobre o plano para adultos de 1x por semana (Presencial).",
};