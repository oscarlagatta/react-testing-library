import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';
import { formatCurrency } from '../../utilities';

export default function OrderSummary() {
    const { totals, optionCounts } = useOrderDetails();

    const scoopArray = Object.entries(optionCounts.scoops); // [['chocolate', 2], ['vanilla', 1]]

    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingsArray = Object.keys(optionCounts.toppings); /// ['M&Ms', 'Gummi bears']

    const toppingList = toppingsArray.map((key) => (
        <li key={key}>{key}</li>
    ));

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>
                {scoopList}
            </ul>
            <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
            <ul>
                {toppingList}
            </ul>
            <SummaryForm />
        </div>
    )
}