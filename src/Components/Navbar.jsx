import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Navbar = () => {
  const jwt = localStorage.getItem('jwt');
  console.log(jwt,"is")
  const navigate = useNavigate()
  const logout =()=>{
    localStorage.removeItem('jwt')
    navigate("/login")
  }

  return (
    <nav>
      <div className="nav-wrapper #607d8b blue-grey">
        <Link to="/" className="brand-logo left">FlipCart</Link>
        <ul id="nav-mobile" className="right">
          <li>
                <Link style={{backgroundColor:" #607d8b"}} to="/cart">
                <i style={{padding:"0px 20px",color:"#81c784"}} className="material-icons large #607d8b blue-grey">add_shopping_cart</i>
                </Link>
          </li>
          {
            jwt ?
            <>
              <li><i style={{padding:"0px 20px",color:"#f44336 "}} className="material-icons large #607d8b blue-grey" onClick={logout}>logout</i></li>
            </>
            :
            <> 
              <li><Link className='#607d8b blue-grey' to="/login">LogIn</Link></li>
              <li><Link className='#607d8b blue-grey' to="/signup">SingUp</Link></li> 
            </>
          }
        
        </ul>
      </div>
  </nav>
  )
}

export default Navbar
