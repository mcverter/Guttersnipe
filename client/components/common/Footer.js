import React, {PropTypes, Component} from 'react';
import {DropdownButton} from 'react-bootstrap';
import {Link} from 'react-router';
class Footer extends Component {
    constructor(props, context) {

        super(props, context);
            let {user} = props;
        }

        render() {
            return (
            <div className="navbar navbar-default navbar-fixed-bottom" role="navigation">
                <div className="container NavColor">
                    <div className="navbar-header" />
                    <ul className="nav navbar-nav navbar-right sm">
                        <li><Link to="faq" className="navbar-brand ">FAQ</Link></li>
                        <li><Link to="documentation"  className="navbar-brand ">Docs</Link></li>
                        <li><Link to="illlegal"  className="navbar-brand ">L@W</Link></li>
                        <li>
                            <Link to="contact"  className="navbar-brand ">
                            <span className="glyphicon glyphicon-envelope" aria-hidden="true" /></Link></li>
                    </ul>
                </div>
            </div>
            );
        }
}

Footer.propTypes = {
    user: PropTypes.object
};

export default Footer;

