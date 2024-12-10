import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

import { render, screen, logRoles } from '@testing-library/react';
import OrderEntry from '../OrderEntry';

test.only("handles error for scoops and toppings routes", async () => {

    // resetting the handlers
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => {
            return new HttpResponse(null, {
                status: 500
            })
        }),
        http.get("http://localhost:3030/toppings", () => {
            return new HttpResponse(null, {
                status: 500
            })
        }),
    );

    const { container } = render(<OrderEntry />);

    const alerts = await screen.findAllByRole('alert');

    logRoles(container)

    expect(alerts).toHaveLength(2);


});

// test("handles error for scoops and toppings routes 2", () => { })
// test("handles error for scoops and toppings routes 3", async () => { })
