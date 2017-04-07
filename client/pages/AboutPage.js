/**
 * Created by mitchell on 4/6/17.
 */

import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class About extends Component {
  render() {
   return (
     <Grid>
       <Row>
         <Col>
           Guttersnipe attempts to create a society based on mutual aid<br />
           by connecting people to resources they can share with each other
         </Col>
       </Row>
     </Grid>
   );
  }

}

export default About;

