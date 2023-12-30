import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ModeToggle } from '@/components/ModeToggle';

import styles from './style/index.module.css';
import ConversationList from './ConversationList';
const ConversationsPage: React.FC = () => {
  return (
    <div className="h-full w-full">
      <PanelGroup autoSaveId="example" direction="horizontal">
        <Panel
          defaultSize={25}
          maxSize={30}
          minSize={15}
          className="bg-gray-100 dark:bg-black_custom-500"
        >
          <ConversationList />
        </Panel>
        <PanelResizeHandle className={styles.ResizeHandleCollapsed} />
        <Panel>
          hello
          <ModeToggle />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ConversationsPage;
