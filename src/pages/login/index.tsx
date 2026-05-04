import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/auth-context";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-page-custom">
      <Card className="w-100 border-0 shadow-sm p-4 rounded-4" style={{ maxWidth: 560 }}>
        <Card.Body>
          <div className="text-center mb-5">
            <h2 className="fw-semibold mb-2">Welcome Back</h2>
            <p className="text-muted mb-0">Please enter your details to access your dashboard</p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="username" className="mb-4">
              <Form.Label className="text-uppercase fw-semibold small text-muted">Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label className="text-uppercase fw-semibold small text-muted">Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            {error && (
              <Alert variant="danger" className="py-2 px-3">
                {error}
              </Alert>
            )}

            <Button type="submit" className="w-100 mt-3 fw-semibold py-2" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <span className="text-muted">Don't have an account? </span>
            <a href="#" className="fw-semibold text-decoration-none">
              Sign Up
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
