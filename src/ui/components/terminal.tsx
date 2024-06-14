import React, { useEffect, useRef, FC } from 'react';
import styled from 'styled-components';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

const TerminalContainer = styled.div`
  height: 80%;
  background-color: #000;
  color: #fff;
`;

interface Props {
  className?: string;
  serverId: string;
}

const Terminal: FC<Props> = function Terminal({ className, serverId }) {
  const containerEl = useRef<HTMLDivElement>(null);
  const xterm = useRef<XTerm>(null);
  const fitAddon = useRef<FitAddon>(null);

  useEffect(() => {
    xterm.current = new XTerm({ cursorBlink: true });
    fitAddon.current = new FitAddon();
    xterm.current.loadAddon(fitAddon.current);
    xterm.current.open(containerEl.current);

    xterm.current.onData((data) => {
      window.gsm.sshInput(data);
      xterm.current.write(data);
      fitAddon.current.fit();
    });

    window.gsm.sshData((data: string) => {
      xterm.current.write(data);
      fitAddon.current.fit();
    });

    fitAddon.current.fit();
    window.gsm.sshConnect(serverId);

    return () => {
      if (xterm.current) xterm.current.dispose();
    };
  }, []);

  return (
    <TerminalContainer ref={containerEl} className={className} />
  );
};

export default Terminal;
