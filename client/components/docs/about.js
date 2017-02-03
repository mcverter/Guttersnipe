import React from 'react';

const About = (props) => (
  <div>
    <div className="BlackOnRed jumbotron text-center">
      <div className="RedOnBlack">
        <img src="modules/core/img/brand/RoadrunnerAtWaste.jpg" /> <br />
      </div>
      <div className="RedOnBlack">
        <h2>by</h2>
        <h1>roadrunner [at] waste [dot] org</h1>
      </div>
      <div className="RedOnBlack">
        <img src="modules/core/img/brand/alien.jpg" /> <br />
      </div>
    </div>

    <br /><hr /><br />

    <div className="RedOnBlack jumbotron">
      <ul> <h2> Consultants </h2>
        <li> David Emanuel </li>
        <li> <a target="_guttersnipe_popup"  href="http://picturethehomeless.org"> Picture The Homeless </a> </li>
        <li> <a target="_guttersnipe_popup"  href="http://freegan.info"> Freegan.info </a></li>
      </ul>
    </div>

    <br /><hr /><br />
  </div>
);

export default About;
