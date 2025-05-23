import { create } from 'zustand';

type Locale = 'ja' | 'en' | 'zh';
type MessageFile = 'about' | 'home' | 'header' | 'footer' | 'services' | 'sales' | 'development' | 'consult' | 'finance' | 'manage' | 'rent'| 'contact';

type Messages = Record<MessageFile, Record<string, string>>;

interface LocaleState {
  locale: Locale;
  messages: Messages;
  setLocale: (newLocale: Locale) => Promise<void>;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'ja',
  messages: {
    about: {},
    home: {},
    header: {},
    footer: {},
    services: {},
    sales: {},
    development: {},
    consult: {},
    finance: {},
    manage: {},
    rent: {},
    contact: {},
  },
  setLocale: async (newLocale) => {
    const loadedMessages: Messages = {
      about: {},
      home: {},
      header: {},
      footer: {},
      services: {},
      sales: {},
      development: {},
      consult: {},
      finance: {},
      manage: {},
      rent: {},
      contact: {},
    };

    const messageFiles: MessageFile[] = ['about', 'home', 'header', 'footer', 'services', 'sales', 'development', 'consult', 'finance','manage', 'rent', 'contact'];

    for (const file of messageFiles) {
      const mod = await import(`../../messages/${newLocale}/${file}.json`);
      loadedMessages[file] = mod.default as Record<string, string>;
    }

    set({ locale: newLocale, messages: loadedMessages });
  },
}));

export type { MessageFile };
