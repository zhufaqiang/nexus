'use client';

import React from 'react';
import Image from 'next/image';
import './BusinessCard.css';
import Link from 'next/link';

// Define the props for each business card
interface BusinessCardProps {
  title: React.ReactNode; // Can be plain text or JSX content
  description: React.ReactNode; // Supports formatted content, line breaks, etc.
  iconSrc: string | React.ReactNode; // Either an image path or an inline SVG/React component
  href: string; // Link to the detailed service page
}

const BusinessCard: React.FC<BusinessCardProps> = ({ title, description, iconSrc, href }) => {
  const isImage = typeof iconSrc === 'string'; // Check if iconSrc is a path string or React element

  return (
    <div className="business-card">
      <div className="icon-wrapper">
        {isImage ? (
          <Image src={iconSrc} alt={`${title} Icon`} width={40} height={40} />
        ) : (
          iconSrc
        )}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <Link href={href} className="read-button">READ</Link>
    </div>
  );
};

export default BusinessCard;
