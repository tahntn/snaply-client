import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Conversation from './Conversation/Conversation';

import styles from './style/index.module.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useParams } from 'react-router-dom';

interface ConversationsPageProps {
  children: React.ReactNode;
}

const ConversationsPage: React.FC<ConversationsPageProps> = ({ children }) => {
  const desktop = '(max-width: 1200px)';
  const tablet = '(max-width: 1000px)';
  const { conversationId } = useParams();

  const isDesktop = useMediaQuery(desktop);
  const isTablet = useMediaQuery(tablet);
  const minSize = React.useMemo(() => {
    if (isDesktop) {
      return 45;
    }
    return 30;
  }, [isDesktop]);

  return (
    <div className="h-full w-full">
      {isTablet ? (
        conversationId ? (
          children
        ) : (
          <div className="bg-gray-100 dark:bg-black_custom-500">
            <Conversation />
          </div>
        )
      ) : (
        <PanelGroup autoSaveId="example" direction="horizontal">
          <Panel
            defaultSize={minSize}
            maxSize={50}
            minSize={minSize}
            className="bg-gray-100 dark:bg-black_custom-500"
          >
            <Conversation />
          </Panel>
          <PanelResizeHandle className={styles.ResizeHandleCollapsed} />
          <Panel>{children}</Panel>
        </PanelGroup>
      )}
    </div>
  );
};

export default ConversationsPage;
