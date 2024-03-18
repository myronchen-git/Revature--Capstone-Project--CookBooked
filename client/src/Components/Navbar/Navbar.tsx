import React from 'react'
import logo from '../../Images/cookbook-logo.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

function Navbar() {
  let redux_username = useSelector((state: RootState) => state.user.username)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-text-top ms-4"></img>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Wall</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/browse">Browse Recipes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            {redux_username &&
              <li className="nav-item">
              <Link className="nav-link" to={`/profile/${redux_username}`}>Profile</Link>
            </li>
            }
          </ul>
          {/* <form className="d-flex me-4" role="search">
            <input className="form-control me-2 border-dark" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
  )
}

export default Navbar
