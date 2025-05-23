'use client';

import './Pg002.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ExpandableTab from '@/components/ExpandableTab/ExpandableTab';
import dynamic from 'next/dynamic';
// import InfoCardButton from '@/components/InfoCardButton/InfoCardButton';
// import styles from '@/components/InfoCardButton/InfoCardButton.module.css';
import { useMessage } from '@/lib/useMessage';
//import { useLocaleStore } from '@/store/useLocaleStore';

// ⚙️ Lottie animation (disabled SSR for client-side only)
const ScrollLottie = dynamic(() => import('@/components/ScrollLottie/ScrollLottie'), { ssr: false });

const Pg002: React.FC = () => {
  const sectionTeamRef = useRef<HTMLDivElement>(null);
  const sectionCompanyRef = useRef<HTMLDivElement>(null);
  const getMessage = useMessage();
  const paragraphLines = getMessage('about', 'pg002_paragraph_2');
  const pg002_section_company_profileLines = getMessage('about', 'pg002_section_company_profile');


  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollTop + windowHeight >= fullHeight - 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      {/* 🔖 Summary section */}
      <div className="flex w-full pb-[60px] relative h-[800px] mb-8">
        <Image
          src="/image/sakura.jpg"
          alt="Summary Image"
          fill
          className="w-full block object-cover z-[100]"
        />
        <div className="summaryText-container">
          <h1>{getMessage('about', 'pg002_title')}</h1>
          <p>{getMessage('about', 'pg002_paragraph_1')}</p>
          {/* <p>{getMessage('about', 'pg002_paragraph_2')}</p> */}
          {
            Array.isArray(paragraphLines)
              ? paragraphLines.map((line, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">{line}</p>
              ))
              : <p className="mb-4 leading-relaxed">{paragraphLines}</p>
          }

        </div>
      </div>

      {/* 👇 まだ最下部でなければ、スクロール誘導アニメーションを表示 */}
      {!isAtBottom && (
        <div className="scroll-lottie-wrapper">
          <ScrollLottie onClick={() => scrollToSection(sectionTeamRef)} />
        </div>
      )}

      {/* 🧩 詳細セクション */}
      <div className="flex flex-col gap-[30px] childContent">

        {/* 🏢 会社概要 */}
        <div className="section-detail" ref={sectionCompanyRef}>
          <ExpandableTab
            title={getMessage('about', 'pg002_section_company_title')}
            subtitle={getMessage('about', 'pg002_section_company_subtitle')}
          >
          {
            Array.isArray(pg002_section_company_profileLines)
              ? pg002_section_company_profileLines.map((line, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">{line}</p>
              ))
              : <p className="mb-4 leading-relaxed">{pg002_section_company_profileLines}</p>
          }
            <p>{getMessage('about', 'pg002_section_company_content')}</p>
            <ul>
              <li>{getMessage('about', 'pg002_section_company_list_1')}</li>
              <li>{getMessage('about', 'pg002_section_company_list_2')}</li>
              <li>{getMessage('about', 'pg002_section_company_list_3')}</li>
              <li>{getMessage('about', 'pg002_section_company_list_4')}</li>
              <li>{getMessage('about', 'pg002_section_company_list_5')}</li>
              <li>{getMessage('about', 'pg002_section_company_list_6')}</li>
            </ul>
            <p>{getMessage('about', 'pg002_section_company_paragraph_2')}</p>
            <p>{getMessage('about', 'pg002_section_company_paragraph_3')}</p>
            <p>{getMessage('about', 'pg002_section_company_paragraph_4')}</p>
          </ExpandableTab>
        </div>

      </div>
    </div>
  );
};

export default Pg002;
