import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavBar } from './NavBar';
import { NavItem } from "../../models/NavItem.ts";
import { EcommerceContext } from "../../contexts/EcommerceContext.ts";

describe('<NavBar />', () => {
  it('should render the NavBar component', () => {
    const itemsNavMain: NavItem[] = [
      {name: 'Home', path: '/'},
      {name: 'Categories', path: '#collapseCategories'},
    ];

    const itemsNavUser: NavItem[] = [
      { name: 'Search', path: '#collapseSearch' },
      { name: 'Account', path: '/my-account' },
      { name: 'Orders', path: '/my-orders' },
      { name: 'Cart', path: '/my-cart' },
      { name: 'Sign out', path: '/sign-out' },
    ];

    const contextValue = {
      searchItems: vi.fn(),
      cartItems: [],
      addToCart: vi.fn(),
      updateCartItemQuantity: vi.fn(),
      removeFromCart: vi.fn(),
      cartItemCount: 0,
      orders: [],
      confirmOrder: vi.fn(),
      getPaymentMethodName: vi.fn(),
      items: [],
      filteredItems: [],
      loading: false,
      error: null,
      searchTerm: ''
    };

    render(
      <EcommerceContext.Provider value={contextValue}>
        <BrowserRouter>
          <NavBar
            brand={"E Commerce"}
            itemsNavMain={itemsNavMain}
            itemsNavUser={itemsNavUser}
            itemsNavCategories={[]}
          />
        </BrowserRouter>
      </EcommerceContext.Provider>
    );

    expect(screen.getByText(/E Commerce/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Or`ders/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    const searchLinks = screen.getAllByRole('link');
    const searchLink = searchLinks.find(link => link.getAttribute('href') === '#collapseSearch');
    expect(searchLink).toBeInTheDocument();

    const cartLinks = screen.getAllByRole('link');
    const cartLink = cartLinks.find(link => link.getAttribute('href') === '/my-cart');
    expect(cartLink).toBeInTheDocument();

    const badgeElements = screen.queryAllByText('0');
    expect(badgeElements.length).toBe(0);
  });
});
