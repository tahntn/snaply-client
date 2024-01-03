import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ModeToggle } from '@/components/ModeToggle';
import styles from './style/index.module.css';
import ConversationList from './Conversation/ConversationList';
import useSearchUsers from '@/hooks/useSearchUses';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useSignOut';
import { storage } from '@/lib/storage';
const ConversationsPage: React.FC = () => {
  const {} = useSearchUsers();
  const { mutate } = useLogout();
  const handleLogout = () => {
    const refreshToken = storage.getString('snalpy-refresh');
    mutate(refreshToken!);
  };
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
          <Button onClick={handleLogout}>logout</Button>
          <ModeToggle />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default ConversationsPage;
