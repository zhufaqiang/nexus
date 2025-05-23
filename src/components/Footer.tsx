'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
//import Image from 'next/image';
import { usePathname } from 'next/navigation'; // 現在のパスを取得するためのフック
//import { useTranslation } from 'react-i18next';
import { useMessage } from '@/lib/useMessage';


interface FooterProps {
  floating?: boolean;
}

const Footer: React.FC<FooterProps> = ({ floating = false }) => {

  // const { messages } = useLocaleStore();
  // const footerMessages = messages['footer'];
  const getMessage = useMessage();// メッセージ取得関数を使用
  // const { t } = useTranslation('footer');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // 現在のページのパスを取得
  const isPg001 = pathname === '/Pg001'; // パスが /Pg001 かどうかを判定

  //const { t } = useTranslation('common');

  // スクロールイベントを監視し、スクロール位置が50pxを超えたら状態を更新
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // screen width detection 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 初回チェック
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer className={clsx('App-footer', {
      floating, // `floating` プロップが true の場合に特定のスタイルを適用
      scrolled, // スクロールに応じてクラス切り替え
    })}>

      {!isMobile ? ( // pc
        <div className="w-full leading-[0.5]">
          {/* Pg001 ページでは非表示  */}
          {!isPg001 && (
            <div className='appFooterContractBG'>
              <div className="font-bold text-shadow">
                <p><span style={{ fontSize: '1.5rem' }}>
                  {getMessage('footer', 'footer_contact_heading')}
                </span>
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p>{getMessage('footer', 'footer_tel')}：03-6231-0984</p>
                  {/* <p>{getMessage('footer', 'footer_mobile')}：xxx-xxxx-xxxx</p> */}
                 
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p>{getMessage('footer', 'footer_fax')}：03-6736-0422</p>
                  <p>{getMessage('footer', 'footer_email')}：INFO@keikyocapital.com</p>
                  
                </div>
              </div>
            </div>
          )}
          <div className='bottom-0 text-center'>
            {/* <p>東京都知事（1）第108005号&nbsp;京喬不動産株式会社 &copy;KEIKYO REAL ESTATE CO.,LTD. ALL RIGHTS RESERVED</p> */}
            <p>{getMessage('footer', 'footer_copyright')}</p>
          </div>

        </div>

      ) : ( // smartphone
        <div className="App-footer-content-smartphone">
          {/* Pg001 ページでは非表示  */}
          {!isPg001 && (
            <div className='appFooterContractBG-smartphone'>
              <div className="font-bold text-shadow">
                <p><span style={{ fontSize: '1.5rem' }}>
                  {getMessage('footer', 'footer_contact_heading')}
                </span>
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p>{getMessage('footer', 'footer_tel')}：03-6231-0984</p>
                  {/* <p>{getMessage('footer', 'footer_mobile')}：xxx-xxxx-xxxx</p> */}
                
                </div>
                <div style={{ textAlign: 'right' }}>
                  {/* <p>ファクス（Fax)： 03-6736-0422</p>
              <p>メール（E-MAIL）： xxxxxx@MARSCAPITALJP.COM</p> */}
                  <p>{getMessage('footer', 'footer_fax')}：03-6736-0422</p>
                  <p>{getMessage('footer', 'footer_email')}：INFO@keikyocapital.com</p>
              
                </div>
              </div>
            </div>
          )}
          <div className='bottom-0 text-center'>
            {/* <p>東京都知事（1）第108005号</p> */}
            {/* 京喬不動産株式会社 */}
            <p>{getMessage('footer', 'footer_copyright')}</p>
          </div>

        </div>
      )}
    </footer>
  );
};

export default Footer;
