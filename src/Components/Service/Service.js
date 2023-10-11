import React from 'react'

export default function Service() {
  return (
    <>
        <section id="services" className="services-area services-eight">
    <div className="section-title-five">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <h6>Services</h6>
              <h2 className="fw-bold">Our Best Services</h2>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="single-services">
            <div className="service-icon">
            <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="service-content">
              <h4>Airtime & Data</h4>
              <p>             
                Airtime & Data
                Buy airtime recharge and data top-up for all major network operators at much cheaper rate.
              </p>
            </div>
          </div>
        </div>
      
        <div className="col-lg-4 col-md-6">
          <div className="single-services">
            <div className="service-icon">
            <ion-icon name="tv-outline"></ion-icon>
            </div>
            <div className="service-content">
              <h4>TV Subscriptions</h4>
              <p>
                Renew your subscription for DStv, Startimes, GOtv and other providers at a reduced price.
              </p>
            </div>
          </div>
        </div>
       
        <div className="col-lg-4 col-md-6">
          <div className="single-services">
            <div className="service-icon">
            <ion-icon name="bonfire-outline"></ion-icon>
            </div>
            <div className="service-content">
              <h4>Electricity Bills</h4>
              <p>
              Buy electricity units or pay postpaid electricity bills accross all DISCOs at a cheaper rate.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single-services">
            <div className="service-icon">
            <ion-icon name="card-outline"></ion-icon>
            </div>
            <div className="service-content">
              <h4>Bill Payments</h4>
              <p>
              Pay your utility bills and more from the comfort of your homes or on-the-fly, all at reduced price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}
