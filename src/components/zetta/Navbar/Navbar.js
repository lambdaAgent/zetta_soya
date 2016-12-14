import React from 'react';
import {navbarContent} from "../../../shared/routeRequirement.js";

/*
 *
 */
const Navbar = props => {
  return(
    <div style={{border: '1px solid blue'}}>
      {
        navbarContent.map((content, index) => {
          return(
            <a
              key={content.path}
              href={props.context.router.reverseRoute(content.path)}
              className={ props.className+ (content.path.toLowerCase() === props.active.toLowerCase() ? ' active' : '')}
              style={{display: 'inline-block', margin: '0 20px', border: '1px black solid'}}
            >
              {content.title}
            </a>
          );
        })
      }
    </div>
  );
};

Navbar.propTypes = {
  context: React.PropTypes.object.isRequired,
  active: React.PropTypes.string.isRequired,
};


export default Navbar;