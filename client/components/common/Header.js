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
            <div class="container NavColor">
                <div class="navbar-header">
                    <button class="navbar-toggle" type="button" >
                        <span class="sr-only">Toggle navigation</span>
                    </button>
                    <Link to="/" class="navbar-brand">Guttersnipe</Link>
                </div>
                <nav class="collapse navbar-collapse" collapse="!isCollapsed" role="navigation">
                    <ul class="nav navbar-nav navbar-right" >
                        <li> Sign In </li>
                        <li> Sign Out</li>
                    </ul>
                </nav>
            </div>
        )
    }
}

Header.propTypes = {
    user: PropTypes.object
};

export default Header;

