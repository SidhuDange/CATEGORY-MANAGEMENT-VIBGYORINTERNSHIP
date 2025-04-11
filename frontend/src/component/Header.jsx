import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <nav className='navbar navbar-expand-lg bg-dark navbar-dark'>
        <div>
            <Link to='/' style={{color:'white',textDecoration:'none'}}>Category Management Application</Link>   
        </div>

    </nav>
  )
}

export default Header