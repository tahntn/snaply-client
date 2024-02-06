import { Text } from '@radix-ui/themes';
import React from 'react';
import reactStringReplace from 'react-string-replace';

interface TextMessageProps {
  title: string;
  className?: string;
}

const TextMessage: React.FC<TextMessageProps> = ({ title, className }) => {
  const formattedTitle = React.useMemo(() => {
    return reactStringReplace(
      reactStringReplace(
        reactStringReplace(title, /(\n)/g, (_match, i) => (
          <React.Fragment key={i}>
            <br />
          </React.Fragment>
        )),
        /(https?:\/\/[^\s]+)/g,
        (match, i) => (
          <a key={i} href={match} target="_blank" rel="noreferrer" className="underline">
            {match}
          </a>
        )
      ),
      /(\s+)/g,
      (match, i) => <React.Fragment key={i}>{match.replace(/ /g, '\u00a0')}</React.Fragment>
    );
  }, [title]);

  return <Text className={className}>{formattedTitle}</Text>;
};

export default React.memo(TextMessage);
