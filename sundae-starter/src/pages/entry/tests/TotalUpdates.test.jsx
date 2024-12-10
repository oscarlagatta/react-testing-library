import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';


test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();

    render(
        <Options optionType='scoops' />
    );

    // decide what flow we are going to test.
    // --------------------------------------
    // make sure total starts out at $0.00
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
    expect(scoopSubtotal).toHaveTextContent('6.00'); // $4 from vanilla + $2 from chocolate
});

test('update toppings subtotal when toppings change', async () => {
    const user = userEvent.setup();
    render(<Options optionType='toppings' />);

    // make sure total starts out at $0.00
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
})