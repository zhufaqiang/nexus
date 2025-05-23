'use client';
import React, { useState, ReactNode } from 'react';
import './ExpandableTab.css';

interface ExpandableTabProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const ExpandableTab: React.FC<ExpandableTabProps> = ({  title, subtitle, children  }) => {
  // コンテンツの表示状態（true = 展開中、false = 閉じた状態）
  const [isExpanded, setIsExpanded] = useState(true); // 初期状態は展開済み

  // クリック時に表示・非表示を切り替える
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-tab">
      {/* タイトル部分 */}
      <div className="tab-header-container">
        <div className="tab-title-block">
          <span className="card-title">{title}</span>
          <span className="card-subtitle">{subtitle}</span>
        </div>
        <div className="tab-toggle" onClick={toggleExpansion}>
          <p className="toggle-text">{isExpanded ? '閉じる' : 'もっと見る'}</p>
        </div>
      </div>
      {/* isExpanded が true の場合のみコンテンツを表示 */}
      {isExpanded && (
        <div className="tab-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableTab;
