import { gql } from '@apollo/client';

export const GET_MENUS = gql`
  query GetMenus($sortByPrice: Boolean) {
    menus(sortByPrice: $sortByPrice) {
      id
      name
      price
      category
    }
  }
`;
export const SEARCH_MENUS = gql`
  query SearchMenus($name: String!) {
    searchMenus(name: $name) {
      id
      name
      price
      category
    }
  }
`;