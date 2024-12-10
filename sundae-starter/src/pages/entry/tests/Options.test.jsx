import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from '../Options';


test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

    expect(scoopImages).toHaveLength(4);

    // confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual([
        'Mint chip scoop',
        'Vanilla scoop',
        'Chocolate scoop',
        'Salted caramel scoop'
    ]);
});;

test('Displays image for each toppings option from server', async () => {
    // Mock the servier worker will return toppings from server
    render(<Options optionType="toppings" />);
    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(6);

    const imageTitles = toppingImages.map(img => img.alt);
    expect(imageTitles).toStrictEqual([
        "M&Ms topping",
        "Hot fudge topping",
        "Peanut butter cups topping",
        "Gummi bears topping",
        "Mochi topping",
        "Cherries topping"
    ]);
});