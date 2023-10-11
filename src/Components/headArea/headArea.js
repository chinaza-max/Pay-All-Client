import React from 'react'
import Form from '../Form/Form'




export default function HeadArea() {


 

  return (
    <> 
        <section id="hero-area"  className="header-area header-eight">
            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 col-12">
                <div className="header-content">
                    <h1>Pay all ultility bills with ease , and get best rate for sme data                 
                        .</h1>
                    <p>
                   Pay-all help you pay up ultility bills while u save up at your convenience .
                    </p>
                    <div className="button">
                    <a href="/#" className="btn primary-btn">Get Started</a>
                 
                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12" >
                    <Form/>
                </div>
            </div>
            </div>
        </section>
    </>
  )
}
