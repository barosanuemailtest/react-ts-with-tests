import { fireEvent, queryByLabelText, queryByText, waitForElement } from '@testing-library/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Login } from './login';
import { LoginService } from './services/LoginService';


describe('Login component tests', () => {
    let container: HTMLDivElement;
    const loginServiceSpy = jest.spyOn(LoginService.prototype, 'login');

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<Login />, container);
        });
    })
    afterEach(() => {
        document.body.removeChild(container as HTMLDivElement);
        container.remove();
    });

    it('Renders correctly initial document', () => {
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].name).toBe('login');
        expect(inputs[1].name).toBe('password');
        expect(inputs[2].value).toBe('Login');

        const label = container.querySelector('label');
        expect(label).not.toBeInTheDocument()
    });
    it.skip('Correctly receives input - NOT WORKING', () => {
        const userNameInput = container.querySelectorAll('input')[0];
        fireEvent.keyDown(userNameInput, { key: 'A', code: 'KeyA' })
        fireEvent.keyDown(userNameInput, { key: 'B', code: 'KeyB' })
        expect(userNameInput).toHaveValue('AB');
    })
    it('renders correctly status label', async () => {
        loginServiceSpy.mockResolvedValueOnce(false);
        const button = container.querySelectorAll('input')[2];
        fireEvent.click(button);
        const label = await waitForElement(() =>
            container.querySelector('label')
        )
        expect(label).toBeInTheDocument();

    });
});