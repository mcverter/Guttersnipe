import React, {PropTypes} from 'react';

export default Footer = (user) => {
    return (
        <div> Footer is footer </div>
    )
}
Footer.propTypes = {
    user: PropTypes.object
}

/*
<div class="navbar navbar-default navbar-fixed-bottom" role="navigation">
    <div class="container NavColor">
        <div class="navbar-header">
        </div>
            <ul class="nav navbar-nav navbar-right sm">
                <li><a ui-sref="faq" class="navbar-brand ">
                    FAQ</a></li>
                <li  ng-class="{active: $uiRoute}">
                    <a ui-sref="documentation"  class="navbar-brand ">
                        Docs</a></li>
                <li  ng-class="{active: $uiRoute}">
                    <a ui-sref="illlegal"  class="navbar-brand ">
                        L@W</a></li>
                <li  ng-class="{active: $uiRoute}">
                    <a ui-sref="contact"  class="navbar-brand ">
                        <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                    </a></li>
            </ul>
        </div>
    </div>

 */