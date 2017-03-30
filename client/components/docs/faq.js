import React from 'react';

const FAQ = (props) => (
  <div>
    <div className="RedOnBlack jumbotron">
      <h1>PROPOSAL:  GUTTERSNIPE FAQ</h1>

      <div>
        <h2>1. What is the site/app?</h2>
        <ul>
          <li><a href="http://www.guttersnipe.org"> Guttersnipe</a> is a web portal and mobile app that caters to the anarcho-communist community who desire to subvert capitalism by sharing resources.</li>
          <li>It will enable people to broadcast to each other primary resources, each of which has a THING, SPACE, and TIME </li>
          <ul>
            <li> THING: Each resource has a description. It is categorized as food, housing, and medicine. Each category will have further subcategories.  Each resource may have tags</li>
            <li> SPACE:  Each resource will have a location with geographic coordinates, and at least one street address or name.  Resources may be located via phone and internet as well. </li>
            <li> TIME:  Each resource will have a schedule of one-time and repeating events. </li>
          </ul>
          <li>
            <strong>Example:</strong> Free Food Not Bombs meal in Prospect Park every Saturday 5:00-7:00PM.
            <ul>
              <li> THING: Category -- food; Subcategory: -- Food Not Bombs; Tags: Outside</li>
              <li> SPACE:  geography -- [40.9999, -70111111]; name -- Prospect Park </li>
              <li> TIME:  Every Saturday, 5:00-7:00PM. </li>
            </ul>
          </li>
        </ul>
      </div>

      <ul>
        <li><strong>2. What need does this meet? or problem does it solve?</strong></li>
        <ul>
        <li>This application serves the urgent need to overthrow capitalism by helping people to self-organize outside and beyond the market of commerce.</li>
        <li>The ultimate intention is to facilitate the creation of alternate avenues of exchange, freely organized by free individuals.</li>
        </ul>
      </ul>
      <ul>
        <li><strong>3. Who is going to use to this site/app?</strong></li>
        <ul>
        <li>In the current incarnation, it is mostly aimed towards the freegans gutterpunks, who live off of dumpstered food, live in squatted housing, and travel by hopping trains.</li>
        <li>As we get a better sense on the needs of the anticapitalist community and possibilities for alternative organizing, we will expand the possibilities for anti-market resource sharing.</li>
        <li>Other shared services such as neeule exchanges, medical clinics, rideshares, and couches will be offered</li>
      </ul>
      </ul>

      <ul>
        <li><strong>4. Why will they go to this site/app?</strong></li>
        <ul>
        <li>To find food, clothing, shelter, etc.  </li>
        </ul>
      </ul>

      <ul>
        <li><strong>5. Why will they keep coming back to your site/app?</strong></li>
        <ul>
        <li>See above.  </li>
        </ul>
      </ul>

      <ul>
        <li><strong>6. How is it different from other similar sites?</strong></li>
        <li>There are similar sites of various types, but many of them have certain faults.</li>
        <li>There is a site called rideshare.com; there is a site named couchsurfer.com; there is freecycle.com, which allows the sharing of goods.</li>
        <li> These are all laudable efforts.  Some of these are marred by an underlying desire for profit.  But some of them are motivated out of genuine desire to promote Mutual Aid.</li>
        <li>The very mission of Guttersnipe.net will be to promote the organization of the lumpenproletariat and to create alternative exchanges outside of capitalism.  This mission will enable Guttersnipe.net to be singularly focused on this goal.  </li>
        <li>It will thus be able to bring together whatever resources necessary for the undermining of capitalism:  the various services-- such as squatting, dumpster diving, hitchhiking, train hopping, resource sharing, etc  -- will be coordinated on a singular web portal.</li>
        <li>In aliition, there are several web portals that are dedicated towards the promotion of anarcho-communist goals.  </li>
        <li> Such sites are
          <ul>
            <li> <a href="http://www.freegan.info"> Freegan.info</a> </li>
            <li> <a href="http://picturethehomeless.org"> Picture the Homeless </a></li>
            <li> <a href="http://www.squat.net"> Squat.net</a> </li>
            <li> <a href="http://foodsharing.de/"> Foodsharing (Germany) </a></li>
          </ul>
        </li>
        <li>In addition, we intend Guttersnipe to be cross platform, available both via the web and as a mobile app.  To my knowledge, there are not yet any apps dedicated with such a task.  </li>
      </ul>
      <ul>
        <li><strong>7. What steps will a person go through interacting with the site/app?</strong></li>
        <li>Most of the various interactions will be hanuled using forms.</li>
        <li>The various services offered by Guttersnipe all boil essentially boil down to two types of transaction:
          <li> <ol>
            <li>  information submission; </li>
            <li>  information retrieval.  </li>
          </ol>
          </li>
          <li> One person posts about an abandoned building or a good dumpster; another person searches for such information.  </li>
          <li>There may be very many different interfaces for the reporting and retrieval.  Some of the data will be entered and retrieved using forms and text inputs; some will be accessed through map interfaces; some will be accessed through calendar interfaces.  </li>
          <li>In addition, there may be some need for identity management.  Some users may choose to register accounts.  Others may choose to always have singular, anonymous transactions.</li>
        </li>
      </ul>

      <h2>Practical Constraints</h2>
      <ul>
        <li><strong> Security</strong></li>
        <li>
          We will have to build in a security infrastructure in the project in order to guarantee anonymity of transactions.
        </li>
        <li>
          <a href="https://www.torproject.org/"> Tor</a>  will be used to anonymize transactions.
        </li>
      </ul>
    </div>
  </div>

);

export default FAQ;
