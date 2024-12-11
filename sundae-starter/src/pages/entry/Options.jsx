import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from './ToppingOption';
import AlertBanner from "../common/AlertBanner";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { pricePerItem } from "../../constants";

export default function Options({ optionType }) {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const { totals } = useOrderDetails();


    // optionType is 'scoops' or 'topings'
    useEffect(() => {
        // create an abortController, to attache to the network request
        const controller = new AbortController();
        axios.get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                if (error.name !== 'CanceledError') setError(true);
            });
        // abort axios call on component unmont
        return () => {
            controller.abort();
        }
    }, [optionType]);

    if (error) {
        return <AlertBanner />
    }

    /// TODO: replace 'null' with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath} />
    ));

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>{title} total: {formatCurrency(totals[optionType])}</p>
            <Row>{optionItems}</Row>
        </>
    );
}