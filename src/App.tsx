import "./App.css";
import { Button, Card } from "react-bootstrap";

function App() {
  return (
    <div>
      <section id="next-steps">
        <Card className="p-3">
          <Card.Body>
            <Card.Title>Frontend Task</Card.Title>
            <Button variant="primary">Click</Button>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default App;
