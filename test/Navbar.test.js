import React from 'react';
import { render, screen, fireEvent,cleanup } from '@testing-library/react';
import Navbar from '../src/components/navbar';

// // Mock the useLocation hook
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useLocation: () => ({
//     pathname: '/',
//   }),
// }));

// describe('Navbar', () => {
//   it('renders the Navbar component', () => {
//     render(<Navbar />);
    
//     // Verify that the Logo is present
//     const logoElement = screen.getByAltText('Mervix Logo');
//     expect(logoElement).toBeInTheDocument();

//     // Verify that the "Home" link is present
//     const homeLink = screen.getByText('Home');
//     expect(homeLink).toBeInTheDocument();
//   });

//   it('toggles the search box when the search button is clicked', () => {
//     render(<Navbar />);
    
//     // Initially, the search box should not be visible
//     expect(screen.queryByPlaceholderText('search')).toBeNull();
    
//     // Click the search button
//     const searchButton = screen.getByText('Search');
//     fireEvent.click(searchButton);

//     // Now, the search box should be visible
//     const searchInput = screen.getByPlaceholderText('search');
//     expect(searchInput).toBeInTheDocument();
//   });

//   // You can add more test cases for other functionality as needed
// });

afterEach(cleanup);

describe('Home, blog present in navbar',()=>{
  const {queryByLabelText, getByLabelText} = render(
   <Navbar/>,
  );
  expect(queryByLabelText()).toBeTruthy()
  console.log(queryByLabelText)
})