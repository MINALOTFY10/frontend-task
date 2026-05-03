import "./App.css";
import { Button, Card } from "react-bootstrap";
import useTheme from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <section id="next-steps">
        <Card className="p-3">
          <Card.Body>
            <Card.Title>Frontend Task</Card.Title>
            <Button variant={theme === "light" ? "dark" : "light"} onClick={toggleTheme}>
              {theme === "light" ? "dark" : "light"}
            </Button>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default App;
