import React, {PropTypes, Component} from 'react';
import {DropdownButton} from 'react-bootstrap';
import {Link} from 'react-router';

class Header extends Component {
    constructor(props, context) {

        super(props, context);
        let {user} = props;
    }

    render() {
        return (
            <div className="container NavColor">
                <div className="navbar-header">
                    <button className="navbar-toggle" type="button" >
                        <span className="sr-only">Toggle navigation</span>
                    </button>
                    <Link to="/" className="navbar-brand">Guttersnipe</Link>
                </div>
                <nav className="collapse navbar-collapse" role="navigation">
                    <ul className="nav navbar-nav navbar-right" >
                        <li> Sign In </li>
                        <li> Sign Out</li>
                    </ul>
                </nav>
            </div>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object
};

export default Header;

