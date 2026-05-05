import React from "react";
import { Container, Card, Button } from "react-bootstrap";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
          <Card className="border-0 shadow-sm p-4 rounded-4" style={{ maxWidth: 560 }}>
            <Card.Body className="text-center">
              <h2 className="fw-semibold mb-3">Oops! Something went wrong</h2>
              <p className="text-muted mb-4">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
              <p className="small text-danger mb-4">{this.state.error?.message}</p>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </Card.Body>
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}
