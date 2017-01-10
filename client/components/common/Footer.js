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
            <div class="navbar navbar-default navbar-fixed-bottom" role="navigation">
                <div class="container NavColor">
                    <div class="navbar-header">
                    </div>
                    <ul class="nav navbar-nav navbar-right sm">
                        <li><Link to="faq" class="navbar-brand ">FAQ</Link></li>
                        <li><Link to="documentation"  class="navbar-brand ">Docs</Link></li>
                        <li><Link to="illlegal"  class="navbar-brand ">L@W</Link></li>
                        <li>
                            <Link to="contact"  class="navbar-brand ">
                            <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></Link></li>
                    </ul>
                </div>
            </div>
            )
        }
}

Footer.propTypes = {
    user: PropTypes.object
};

export default Footer;

