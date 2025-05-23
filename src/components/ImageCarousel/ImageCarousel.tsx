'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageCarousel.css'; 

// 表示する画像のパスを配列で定義
const images = [
  '/image/pg001-1.jpg',
  '/image/pg001-2.jpg',
  '/image/pg001-3.jpg',
  '/image/pg001-4.jpg',
];

// ①〜④ の文字を対応させる
const indicators = ['①', '②', '③', '④'];

const ImageCarousel: React.FC = () => {
  // 現在表示中の画像インデックスを状態として管理
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // 一定時間（5秒）ごとに画像を切り替える
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 画像切り替え */}
      <AnimatePresence>
        <motion.img
          key={images[current]}
          src={images[current]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="background"
        />
      </AnimatePresence>

      {/* インジケーター：右下に①②③④表示 */}
      <div className="carousel-indicator">
        {indicators.map((symbol, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)} // ボタンをクリックしたときに画像インデックスを更新
            className={`carousel-btn transition-opacity ${index === current ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
