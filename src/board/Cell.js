import React from 'react';
import {play} from '../App.js';
const Cell = ({ value, columnIndex, play }) => {

  let color = 'emptycell';
  if (value === 1) {
    color = 'bluecell';
  } else if (value === 2) {
    color = 'purplecell';
  }
  return (
    <td>
      <div className="cell" onClick={() => {play(columnIndex)}}>
        <div className={color}></div>
      </div>
    </td>
  )
}

  export default Cell;
