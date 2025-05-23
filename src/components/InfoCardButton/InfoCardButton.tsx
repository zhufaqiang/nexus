import { useState, useEffect, useRef } from 'react';
import styles from './InfoCardButton.module.css';
import { useLocaleStore } from '@/store/useLocaleStore';
import { useMessage } from '@/lib/useMessage';

type InfoCardButtonProps = {
  onClickTeam: () => void;
  onClickCompany: () => void;
  onClickPhotos: () => void;
};

const InfoCardButton: React.FC<InfoCardButtonProps> = ({
  onClickTeam,
  onClickCompany,
  onClickPhotos,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { locale } = useLocaleStore();
  const isCJK = locale === 'ja' || locale === 'zh';
  const getMessage = useMessage();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);
  // 🖱 Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  if (!isMobile) return null; // Render only on mobile devices

  return (
    <div ref={containerRef}>
      {/* 📝 Sticky tab button */}
      {/* {!isOpen && (
        <div className={styles.floatingButton} onClick={() => setIsOpen(true)} />
      )} */}
      {!isOpen && (
        <div className={styles.stickyButtonWrapper} onClick={() => setIsOpen(true)}>
          {/* <div className={styles.stickyButtonSquare} /> */}
          <div className={styles.stickyButtonLabelVertical}>サービス一覧</div>
        </div>
      )}

      {/* 📂 Expandable card list */}
      {isOpen && (
        <div className={styles.cardMenu}>
          <div className={styles.cardItem} onClick={() => { onClickTeam(); setIsOpen(false); }}>
            <h3 className={isCJK ? styles.verticalText : styles.horizontalText}>
              {getMessage('about', 'pg002_nav_team')}
            </h3>
          </div>
          <div className={styles.cardItem} onClick={() => { onClickCompany(); setIsOpen(false); }}>
            <h3 className={isCJK ? styles.verticalText : styles.horizontalText}>
              {getMessage('about', 'pg002_nav_company')}
            </h3>
          </div>
          <div className={styles.cardItem} onClick={() => { onClickPhotos(); setIsOpen(false); }}>
            <h3 className={isCJK ? styles.verticalText : styles.horizontalText}>
              {getMessage('about', 'pg002_nav_photos')}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCardButton;
