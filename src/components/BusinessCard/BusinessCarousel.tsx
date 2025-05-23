'use client';

import React from 'react';
import BusinessCard from './BusinessCard';
import './BusinessCard.css';
import { useMessage } from '@/lib/useMessage';
import {
  RealEstateIcon001,
  RealEstateIcon002,
  RealEstateIcon003,
  RealEstateIcon004,
  RealEstateIcon005,
  RealEstateIcon006
} from '@/components/Icons';

const BusinessCarousel: React.FC = () => {
  const getMessage = useMessage();

  const cardData = [
    {
      title: getMessage('services', 'card_sales_title'),
      description: getMessage('services', 'card_sales_desc'),
      iconSrc: <RealEstateIcon001 />,
      href: '/services/sales',
    },
    {
      title: getMessage('services', 'card_rent_title'),
      description: getMessage('services', 'card_rent_desc'),
      iconSrc: <RealEstateIcon002 />,
      href: '/services/rent',
    },
    {
      title: getMessage('services', 'card_manage_title'),
      description: getMessage('services', 'card_manage_desc'),
      iconSrc: <RealEstateIcon003 />,
      href: '/services/manage',
    },
    {
      title: getMessage('services', 'card_consult_title'),
      description: getMessage('services', 'card_consult_desc'),
      iconSrc: <RealEstateIcon004 />,
      href: '/services/consult',
    },
    {
      title: getMessage('services', 'card_dev_title'),
      description: getMessage('services', 'card_dev_desc'),
      iconSrc: <RealEstateIcon005 />,
      href: '/services/development',
    },
    {
      title: getMessage('services', 'card_fin_title'),
      description: getMessage('services', 'card_fin_desc'),
      iconSrc: <RealEstateIcon006 />,
      href: '/services/finance',
    },
  ];

  return (
    <div className="px-4 py-8">
      <div className="business-grid">
        {/* {cardData.map((card, index) => (
          <div key={index}>
            <BusinessCard {...card} />
          </div>
        ))} */}
        {cardData.map((card, index) => (
          <div key={index} className="h-full">
            <BusinessCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCarousel;
