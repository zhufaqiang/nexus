'use client';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { useLocaleStore } from '@/store/useLocaleStore';
import "./LanguageSwitcher.css";

type SupportedLocale = 'ja' | 'en' | 'zh';

const locales = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();

  return (
    <div className="language-switcher-container">
      <Listbox value={locale} onChange={(val) => setLocale(val as SupportedLocale)}>
        <div className="language-switcher">
          <ListboxButton className="language-switcher-button">
            {/* current selected lang */}
            <span className="language-switcher-text">
              {locales.find((l) => l.code === locale)?.label}
            </span>
            {/* dropdown arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="language-switcher-svg"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.355a.75.75 0 011.04 1.08l-4.25 3.84a.75.75 0 01-1.04 0l-4.25-3.84a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </ListboxButton>
          <ListboxOptions className="language-switcher-options">
            {locales.map((l) => (
              <ListboxOption
                key={l.code}
                value={l.code}
                as="div"
                className="language-switcher-option"
              >
                {l.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
