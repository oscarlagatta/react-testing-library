import { Container } from "react-bootstrap";
import OrderEnEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEnEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
