import React from 'react';
import QuestionList from './components/QuestionList';
import QuestionDetail from './components/QuestionDetail';
import { connect } from 'react-redux';

import {
  Route,
  Link
} from 'react-router-dom';

const AppDisplay = () => (
  <div>
    <div>
      <Link to={`/`}>
        <h1>Isomorphic React</h1>
      </Link>
    </div>
    <Route exact path='/' render={()=><QuestionList/>}/>
    <Route exact path='/questions/:id' render={({match})=><QuestionDetail question_id={match.params.id}/>}/>
  </div>
);

const mapStateToProps = (state, ownProps) =>({...state,});

export default connect(mapStateToProps)(AppDisplay);
