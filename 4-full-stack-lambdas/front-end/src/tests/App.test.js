import { render, screen } from '@testing-library/react';
import { API } from 'aws-amplify';
import App from '../App';

test('That the title is rendered', () => {
  render(<App />);
  const logoElement = screen.getByText('The Nerd Blog');
  expect(logoElement).toBeInTheDocument();
});

test('Posts are added to the page', () => {
  API.get = jest.fn().mockResolvedValue(
    new Promise((resolve) => resolve({
      "posts":[{
        "owner":"3eb9067d-e937-45fd-ada8-7f2e5ec2ea05",
        "id":"e8762d45-dbae-48d9-896d-1931221bd1c7",
        "body":"3",
        "title":"Nice Post"
      }],
    }))
  );

  render(<App />);
  setTimeout(() => {
    const logoElement = screen.getByText('Nice Post');

    expect(logoElement).toBeInTheDocument();
  }, 0);
});
