import React,{useEffect} from 'react'



export default function Nav(props) {
    
useEffect(()=>{
         //===== close navbar-collapse when a  clicked
      let navbarTogglerNine = document.querySelector(
        ".navbar-nine .navbar-toggler"
      );
      navbarTogglerNine.addEventListener("click", function () {
        navbarTogglerNine.classList.toggle("active");
      });


      let sideMenuLeftNine = document.querySelector(".navbar-nine .menu-bar");
  
      sideMenuLeftNine.addEventListener("click", function () {
        props.openFuncP(true)
      })
    
})

  return (
    <>

        <section className="navbar-area navbar-nine">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="index.html">
                    <img src="assets/images/logo.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNine"
                    aria-controls="navbarNine" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse sub-menu-bar" id="navbarNine">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                        <a className="page-scroll active" href="#hero-area">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="page-scroll" href="#services">Services</a>
                        </li>
                        <li className="nav-item">
                        <a className="page-scroll" href="#plan">Plan</a>
                        </li>
                    </ul>
                    </div>

                    <div className="navbar-btn d-none d-lg-inline-block">
                    <a className="menu-bar" href="#side-menu-left"><i className="lni lni-menu"></i></a>
                    </div>
                </nav>
                
                </div>
            </div>
            </div>

        </section>

    </>
  )
}
