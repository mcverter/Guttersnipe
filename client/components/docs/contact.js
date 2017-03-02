import React from 'react';
import imgsrc from '../../img/RoadrunnerAtWaste.jpg'

const Contact = (props) =>  (
  <div className="text-center jumbotron RedOnBlack">
    <a  href="mailto:roadrunner@waste.org">
      <img src={imgsrc} /> <br />
      roadrunner [at] waste [dot] org <br />
    </a>
  </div>
);

export default Contact;

/*
      <img src="modules/core/img/brand/RoadrunnerAtWaste.jpg" />

 */
