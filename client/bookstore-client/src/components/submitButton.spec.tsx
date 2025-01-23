import ReactDom from 'react-dom';
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from 'vitest'
import {SubmitButton} from "./submitButton";

// jest.mock('react-dom', () => ({
//     useFormStatus: jest.fn(),
// }));
describe('SubmitButton', () => {
    it('Should have label Save', () => {
        render(
            <SubmitButton/>
        );

        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    // it('Should have label Saving', () => {
    //     const formData: FormData = vi.mocked()
    //     vi.spyOn(ReactDom, 'useFormStatus').mockReturnValue({pending: true, method: 'method', data: {}})
    //    mocked.useFormStatus = vi.fn().mockReturnValue({pending: true})
    //     render(
    //         <SubmitButton/>
    //     );
    //
    //     expect(screen.getByText('Saving')).toBeInTheDocument();
    // })
})
