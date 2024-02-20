import React from 'react'
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
       <Navbar fluid rounded className=' shadow py-5'>
      <Navbar.Brand  href="https://flowbite-react.com">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span>Inventory</span>
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span> */}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/addproduct" active>
          Add product
        </Navbar.Link>
        <Navbar.Link as={Link} to="/allproduct" active>
          All product
        </Navbar.Link>
        
      </Navbar.Collapse>
    </Navbar>
    </header>
  )
}

export default Header