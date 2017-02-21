import React from 'react';
import {Link} from 'react-router';
import Kropotkin from './kropotkins/kropotkin';
//import imgsrc from '../img/piafGutterCropped.png';
import SERVER_URL  from '../config';

const FrontPage = (props) => (
  <section className="front-pg">
    <div className="text-center jumbotron RedOnBlack">
      <ul className="nav nav-pills nav-stacked">
        <li><Link to="/shareables/create" className="btn btn-lg BlackOnRed"> Create Shareable </Link></li>
        <li><Link to="/shareables" className="btn btn-lg BlackOnRed"> List Shareables </Link></li>
        <li><Link to="/shareables/search" className="btn btn-lg BlackOnRed"> Search Shareables </Link></li>
       </ul>
    </div>

    <br /><hr /><br />
    <div className="jumbotron BlackOnRed text-center">
      <Link to="mission">
        <q>the truth is only known by guttersnipes</q> <br />
        <cite>&nbsp;&nbsp;-- joe strummer</cite>
      </Link>
      <br />

    </div>



    <br /><hr /><br />
    <Kropotkin />

  </section>
);

export default FrontPage;


/*
      <img src={imgsrc} />

 */
