import React from 'react';
import {Link} from 'react-router';
import Kropotkin from './kropotkins/Kropotkin';
import imgsrc from '../img/piafGutterCropped.png';
import {SERVER_URL}  from '../config';
import Panel from 'react-bootstrap/lib/Panel';

const FrontPage = (props) => {
  let piaf_image;
  if (__DEV__) {
    piaf_image = <img src={imgsrc} className="piaf-img"/>
  } else {
    const piafSrc = SERVER_URL + '/sta' + 'tic/img/piafGutterCropped.png'
    piaf_image = <img src={piafSrc} className="piaf-img"/>
  }

  return (
    <section className="front-pg">
      <Panel className="front-page-panel text-center">
        <ul className="nav nav-pills nav-stacked">
          <li><Link to="/shareables/create" className="btn btn-lg"> Create Shareable </Link></li>
          <li><Link to="/shareables" className="btn btn-lg"> List Shareables </Link></li>
          <li><Link to="/shareables/search" className="btn btn-lg"> Search Shareables </Link></li>
        </ul>
      </Panel>

      <br /><hr /><br />
      <div className="jumbotron strummer-quote text-center">
        <Link to="/docs/mission">
          <q>the truth is only known by guttersnipes</q> <br />
          <cite>&nbsp;&nbsp;-- joe strummer</cite>
        </Link>
        <br />
      </div>


      {piaf_image}

      <br /><hr /><br />
      <Kropotkin />

    </section>
  );
}
export default FrontPage;


/*
 <img src={imgsrc} />

 */
