import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import Input from '~/components/Input';

describe('TechList', () => {
    it('You should select a Date', () => {
        const { getByText, getByTestId } = render(<Input />);

        fireEvent.changeText(getByTestId('email'), 'Tiago');
        fireEvent.press(getByText('Acessar'));

        expect(getByText('Tiago')).toBeTruthy();
    });
});
