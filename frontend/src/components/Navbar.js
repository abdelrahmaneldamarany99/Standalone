import { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom'
import { useSignout } from '../hooks/useSignout'

const Navbar = () => {
  const { signout } = useSignout()
  const {user} = useContext(AuthContext)


  const handleClick = () => {
    signout()
  }

  return (
    <header className='navbar'>
      <div className="container">
        <Link to="/">
          <h1>Standalone</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Sign out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link className='btn btn-info' to="/signin">Sign in</Link>
              <Link className='btn btn-success' to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar