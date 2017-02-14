import React from 'react';
import {Link} from 'react-router';
import Kropotkin from './kropotkins/kropotkin';

const FrontPage = (props) => (
  <section>
    <img src="/img/piaf/Gutter1.png" />

    <div className="text-center jumbotron RedOnBlack">
      <ul className="nav nav-pills nav-stacked">
        <li><Link to="/shareables/create" className="btn btn-lg BlackOnRed"> Create Shareable </Link></li>
        <li><Link to="/shareables" className="btn btn-lg BlackOnRed"> List Shareables </Link></li>
        <li><Link to="/shareables/search" className="btn btn-lg BlackOnRed"> Search Shareables </Link></li>
       </ul>
    </div>

    <br /><hr /><br />
    <div className="jumbotron BlackOnRed text-center">
      <a ui-sref="mission">
        <q>the truth is only known by guttersnipes</q> <br />
        <cite>&nbsp;&nbsp;-- joe strummer</cite>
      </a>
    </div>

    <br /><hr /><br />
    <Kropotkin/>

  </section>

);

export default FrontPage;
