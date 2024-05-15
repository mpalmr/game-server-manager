import React, { ErrorInfo, Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class GlobalErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return !error ? children : (
      <>
        <h1>Error</h1>
        <pre>{error.message}</pre>
        <button type="button" onClick={document.location.reload}>
          Reload
        </button>
      </>
    );
  }
}
