import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/auth-context";
import styles from "./login.module.css";

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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
    <Container fluid className={`${styles.loginPage} d-flex align-items-center justify-content-center min-vh-100`}>
      <Card className={`${styles.loginCard} border-0 shadow-sm p-4`}>
        <Card.Body className="p-2">
          <div className="text-center mb-5">
            <h2 className={`fw-bold mb-2 ${styles.loginHeading}`}>Welcome Back</h2>
            <p className={`mb-0 ${styles.loginSubtitle}`}>Please enter your details to access your dashboard</p>
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label className={`${styles.loginLabel} text-uppercase fw-semibold`}>Username</Form.Label>
              <Form.Control
                className={`${styles.loginInput} border-0`}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={`${styles.loginLabel} text-uppercase fw-semibold`}>Password</Form.Label>
              <Form.Control
                className={`${styles.loginInput} border-0`}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" className="py-2 px-3 my-3">
                {error}
              </Alert>
            )}

            <Button type="submit" className={`${styles.loginBtn} w-100 mt-3 fw-semibold`} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <span className={styles.loginMeta}>Don't have an account? </span>
            <a href="" className={`${styles.loginLink} text-decoration-none fw-semibold`}>
              Sign Up
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
