import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul className="d-flex list-unstyled justify-content-center mb-0">
        <li className="me-3">
          <Link to="/boleteria">Boletería</Link>
        </li>
        <li className="me-3">
          <Link to="/dulceria">Dulcería</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
