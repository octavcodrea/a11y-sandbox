import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";

test("renders A11y features toggle", () => {
    const router = createMemoryRouter(
        [
            {
                path: "/",
                element: <App />,
                children: [{ index: true, element: <div>Home</div> }],
            },
        ],
        { initialEntries: ["/"] },
    );

    render(
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>,
    );

    expect(
        screen.getByRole("button", { name: /Enable A11y Features/i }),
    ).toBeInTheDocument();
});
