import { cx } from '@emotion/css';
import { sTabButton, sTabButtonActive, sTabContainer } from './styles';
import { TabsProps } from './types';

export const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className={sTabContainer}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveTab(tab.value);
          }}
          className={cx(sTabButton, activeTab == tab.value && sTabButtonActive)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
