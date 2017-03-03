
import React from 'react';
const ConsentPage = (props) => (
  <div>
    <div class="agreement-div jumbotron">
      Through your usage of Guttersnipe, you agree to not put yourself or any other person in legal jeopardy.
      <div class="text-center">
        <a type="button" class="btn btn-danger" ui-sref="home">Negate</a>

        <a type="button" class="btn btn-success" ui-sref="createResource.instructions">Consent </a>
      </div>
      <div class="text-center">
        <del> <em><small>You are free to use Guttersnipe as you wish.</small></em></del>
      </div>
    </div>
  </div>
);

export default ConsentPage;
