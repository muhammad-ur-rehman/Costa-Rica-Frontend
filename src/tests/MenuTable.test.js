import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import MenuTable from '../components/MenuTable';
import { GET_MENUS, SEARCH_MENUS } from '../queries';

const mocks = [
  {
    request: {
      query: GET_MENUS,
      variables: { sortByPrice: false },
    },
    result: {
      data: {
        menus: [
          { id: '1', name: 'Menu 1', price: 10, createdAt: '2023-01-01' },
          { id: '2', name: 'Menu 2', price: 20, createdAt: '2023-01-04' },
        ],
      },
    },
  },
  {
    request: {
      query: SEARCH_MENUS,
      variables: { name: 'Menu 1' },
    },
    result: {
      data: {
        searchMenus: [
          { id: '1', name: 'Menu 1', price: 10, createdAt: '2023-01-03' },
          { id: '2', name: 'Menu 2', price: 10, createdAt: '2023-01-01' },
          { id: '3', name: 'Menu 3', price: 10, createdAt: '2023-01-05' },
        ],
      },
    },
  },
];

describe('MenuTable component', () => {
  it('renders the component', () => {
    render(
      <MockedProvider mocks={mocks}>
        <MenuTable />
      </MockedProvider>
    );
  });

  it('displays loading message when data is loading', async () => {
    const { getByText } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_MENUS,
              variables: { sortByPrice: false },
            },
            result: { data: {} },
          },
        ]}
      >
        <MenuTable />
      </MockedProvider>
    );

    await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument());
  });

  it('displays error message when there is an error', async () => {
    const { getByText } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_MENUS,
              variables: { sortByPrice: false },
            },
            error: new Error('An error occurred'),
          },
        ]}
      >
        <MenuTable />
      </MockedProvider>
    );

    await waitFor(() => expect(getByText('Error: An error occurred')).toBeInTheDocument());
  });


  it('displays menu items when data is loaded', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <MenuTable />
      </MockedProvider>
    );
    await waitFor(() => expect(getByText('Menu 1')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Menu 2')).toBeInTheDocument());
  });

  it('allows searching by name', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks}>
        <MenuTable />
      </MockedProvider>
    );

    await waitFor(() => expect(getByText('Menu 2')).toBeInTheDocument());
    const searchInput = getByPlaceholderText('Search by Name');
    fireEvent.change(searchInput, { target: { value: 'Menu 1' } });
    await waitFor(() => expect(getByText('Menu 1')).toBeInTheDocument());
  });
});
