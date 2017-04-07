/**
 * Created by mitchell on 4/6/17.
 */

import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class HowToUse extends Component {
  render() {
   return (
     <Grid>
       <Row>
         <Col>
           Enter the type of resource you would like to look for. <br />
           You will then be directed to a map. <br />
           Click on any of the markers to learn more
         </Col>
       </Row>
     </Grid>
   )
  }

}

export default HowToUse;

