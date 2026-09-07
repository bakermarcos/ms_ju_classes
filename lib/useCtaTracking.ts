import { useEffect } from 'react';
import { trackEvent } from './analytics';

/**
 * Pageview mais os cliques que importam: WhatsApp e Instagram.
 *
 * Usa delegação num único listener em vez de onClick espalhado por componente,
 * então qualquer CTA novo passa a ser medido sem alterar o componente.
 *
 * A pergunta de negócio é "qual plano faz a pessoa chamar no WhatsApp", por isso
 * o evento carrega a seção de origem e, nos cards, o plano e o preço.
 */
export const useCtaTracking = () => {
  useEffect(() => {
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
    });

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.href;
      const secao = link.closest('section')?.id || 'rodape';
      const rotulo = (link.textContent || '').trim().slice(0, 60);

      if (href.includes('wa.me')) {
        const card = link.closest('.plan-card');
        trackEvent('contato_whatsapp', {
          secao,
          rotulo,
          plano: card?.querySelector('h3')?.textContent?.trim() ?? 'nenhum',
          preco: card?.querySelector('.plan-price')?.textContent?.trim() ?? 'nenhum',
          modalidade: card?.querySelector('.plan-modality')?.textContent?.trim() ?? 'nenhum',
        });
        return;
      }

      if (href.includes('instagram.com')) {
        trackEvent('clique_instagram', { secao, rotulo });
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
};
