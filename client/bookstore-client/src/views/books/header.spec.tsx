import {render, screen} from '@testing-library/react';

import {Header} from "./header";

describe('Header', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<Header title='Book'/>);
        expect(baseElement).toBeTruthy();
        expect(screen.findByText('Book')).toBeTruthy;
    });
});
