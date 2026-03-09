import { useState, ReactNode, createContext, useContext } from 'react';
import styles from './Tabs.module.scss';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  defaultTab: string;
  children: ReactNode;
  className?: string;
}

export const Tabs = ({ defaultTab, children, className = '' }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`${styles.tabs} ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export const TabList = ({ children, className = '' }: TabListProps) => {
  return (
    <div className={`${styles.tabList} ${className}`} role="tablist">
      {children}
    </div>
  );
};

export interface TabProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const Tab = ({ id, children, className = '' }: TabProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      className={`${styles.tab} ${isActive ? styles.active : ''} ${className}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

export interface TabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const TabPanel = ({ id, children, className = '' }: TabPanelProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;
  if (activeTab !== id) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      className={`${styles.tabPanel} ${className}`}
    >
      {children}
    </div>
  );
};
