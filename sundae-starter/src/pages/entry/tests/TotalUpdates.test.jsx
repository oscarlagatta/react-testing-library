import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();

    render(
        <Options optionType='scoops' />
    );

    // decide what flow we are going to test.
    // --------------------------------------
    // make sure total starts out at £0.00
    const scoopSubtotal = screen.getByText('Scoops total: £', {
        exact: false
    });
    expect(scoopSubtotal).toHaveTextContent('0.00');

    // update vanilla scoop to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(scoopSubtotal).toHaveTextContent('2.00');

    // update chocolage scoop to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate'
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');
    expect(scoopSubtotal).toHaveTextContent('6.00'); // £4 from vanilla + £2 from chocolate
});

test('update toppings subtotal when toppings change', async () => {
    const user = userEvent.setup();
    render(<Options optionType='toppings' />);

    // make sure total starts out at £0.00
    const toppingsTotal = screen.getByText('Toppings total: £', { exact: false });
    expect(toppingsTotal).toHaveTextContent("0.00");

    // add cherries and check subtotal
    const cherriesCheckbocx = await screen.findByRole('checkbox', {
        name: 'Cherries'
    });
    await user.click(cherriesCheckbocx);
    expect(toppingsTotal).toHaveTextContent('1.50');

    // add hot fudge and check subtotal
    const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' });
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("3.00");

    // remove hot fudge and check subtotal
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
    test('grand total starts at £0.00', () => {
        // test the total starts out at £0.00
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', {
            name: /Grand total: £/
        });
        expect(grandTotal).toHaveTextContent('0.00');
    });

    test('grand total updates properly if scoop is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: £/ });

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");
        expect(grandTotal).toHaveTextContent('4.00');

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('5.50');
    });

    test('grand total updates properly if topping is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: £/ });

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        await user.click(cherriesCheckbox);

        expect(grandTotal).toHaveTextContent('1.50');

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");
        expect(grandTotal).toHaveTextContent('5.50');
    });

    test('grand total updates properly if item is removed', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);

        // add cherries
        const cherriesCheckbox = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        await user.click(cherriesCheckbox);
        // grand total £1.5

        // update vanilla scoops to 2, grand total should be £5.50
        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");

        // remove 1 scoop of vanilla and check grand total
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        // check grand total
        const grandTotal = screen.getByRole('heading', { name: /Grand total: £/ });
        expect(grandTotal).toHaveTextContent('3.50');

        // remove cherries and check grand total
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('2.00');
    });
})