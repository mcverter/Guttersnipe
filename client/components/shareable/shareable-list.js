import React from 'react';
import Kitten from './Kitten';
import useSheet from 'react-jss';
import { connect } from 'react-redux';
import { addKitten, deleteKitten } from '../actions/kittens';

const Kittens = ({ thing, space, time }) =>
  <div className={sheet.classes.kittens}>
    {!!kittens.length &&
      <h1>Look, there are kittens in this basket:</h1>
    }
    {!!kittens.length &&
      <div className={sheet.classes.basket}>
        {kittens.map(kitten => (
          <Kitten key={`kitten-${kitten.id}`}
                  kitten={kitten}
                  onDeleteKitten={deleteKitten} />
        ))}
      </div>
    }
    {!kittens.length &&
      <h1>This backet has no kittens in it :(</h1>
    }
    <a className={sheet.classes.button} onClick={addKitten}>
      Put another kitten into basket
    </a>
    <div className={sheet.classes.credits}>
      {'Icons made by '}
      <a className={sheet.classes.link}
         href='http://www.flaticon.com/authors/freepik'
         title='Freepik'>
        Freepik
      </a>
      {' from '}
      <a className={sheet.classes.link}
         href='http://www.flaticon.com'
         title='Flaticon'>
        www.flaticon.com
      </a>
      {' is licensed by '}
      <a className={sheet.classes.link}
         href='http://creativecommons.org/licenses/by/3.0/'
         title='Creative Commons BY 3.0'>
        CC BY 3.0
      </a>
    </div>
  </div>;

};

export default connect(
  state => ({ kittens: state.kittens }),
  { addKitten, deleteKitten }
)(
  useSheet(Kittens, STYLES)
);
