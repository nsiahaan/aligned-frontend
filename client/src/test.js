import Card from './Card.svelte'
//import '@testing-library/jest-dom'
import { render, fireEvent} from '@testing-library/svelte'

test('it works', async () => {
    const { getByText, getByTestId } = render(Card, {
        name: 'Tony',
      });
  
    expect(getByText('About Me:')).toBeInTheDocument();
  })