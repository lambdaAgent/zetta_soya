import React from 'react';
import {navbarContent} from "../../../shared/routeRequirement.js";

/*
 *  you can get the url by providing prop.context.router.reverseRoute() with these options:
 *
 */
const Navbar = props => {
  let URL = props.context.router.reverseRoute("SUPPLIER_DETAIL");
  console.log(URL);
  debugger;
  return(
    <div style={{border: '1px solid blue', backgroundColor: "white"}}>
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