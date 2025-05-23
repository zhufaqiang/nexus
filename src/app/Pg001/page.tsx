'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
import "./Pg001.css"
import { useMessage } from '@/lib/useMessage';


const sanitize = (html: string) => {
  return html
    .replace(/<(?!\/?(ruby|rt)>)/gi, '') // 只允许 ruby/rt 标签
    .replace(/on\w+=".*?"/gi, '');        // 移除如 onclick=
};


const Pg001: React.FC = () => {

  // const { messages } = useLocaleStore();
  // const home = messages['home'];
  const getMessage = useMessage();
  const router = useRouter();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleClick = () => {
    router.push('/Pg002');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      <ImageCarousel />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 top-[calc(50%-150px)]">
        {/* <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 inset-0 flex flex-col items-center justify-center text-center text-white z-10"> */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="responsive-title gradient-text"
        >
          {getMessage('home', 'pg001_title')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="responsive-subtitle gradient-text"
          dangerouslySetInnerHTML={{ __html: sanitize(getMessage('home', 'pg001_subtitle')) }}
        >
          {/* {getMessage('home', 'pg001_subtitle')} */}
        </motion.p>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="custom-button"
        >
          {getMessage('home', 'pg001_button_learn_more')}
        </motion.button>

      </div>
    </div>
  );
};

export default Pg001;
