
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Slide.css"



import image from "../../Image/9mobile.png";
import image2 from "../../Image/aedc.png";
import image3 from "../../Image/airtel.png";
import image4 from "../../Image/dstv.png";
import image5 from "../../Image/startimes.png";





const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };
  

export default function Slide() {
  return (
    <Carousel responsive={responsive}   arrows={false} infinite={true} autoPlay={true}  autoPlaySpeed={7000}  containerClass="carousel-container">
        <div> <img src={image} alt=""/></div>
        <div><img src={image2} alt=""/></div>
        <div> <img src={image3} alt=""/></div>
        <div><img src={image4} alt=""/></div>
        <div> <img src={image5} alt=""/></div>
        <div> <img src={image} alt=""/></div>
        <div><img src={image2} alt=""/></div>
        <div> <img src={image3} alt=""/></div>
        <div><img src={image4} alt=""/></div>
        <div> <img src={image5} alt=""/></div>
        <div> <img src={image} alt=""/></div>
        <div><img src={image2} alt=""/></div>
        <div> <img src={image3} alt=""/></div>
        <div><img src={image4} alt=""/></div>
        <div> <img src={image5} alt=""/></div>
      
    </Carousel>
  )
}
