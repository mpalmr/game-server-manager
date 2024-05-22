import React, {
  useCallback,
  useEffect,
  useState,
  FC,
} from 'react';
import styled from 'styled-components';
import type { SshDataCb } from '../../preload';

const TerminalText = styled.pre`
  margin: .5em;
  background-color: #000;
  color: #fff;
  font-family: monospace;
`;

const SshTerminal: FC = function SshTerminal() {
  const [text, setText] = useState('');

  const handleSshData: SshDataCb = useCallback((event, value) => {
    setText((prev) => prev.concat(value));
  }, []);

  useEffect(() => {
    window.gsm.onSshData(handleSshData);
    return () => {
      window.gsm.offSshData(handleSshData);
    };
  }, []);

  return (
    <TerminalText>{text}</TerminalText>
  );
};

export default SshTerminal;
