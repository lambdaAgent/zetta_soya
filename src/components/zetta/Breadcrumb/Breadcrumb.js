import React from 'react';


// const Breadcrumb = props => {
//   const path = props.path;
//   const workingUrl = path.split(this.props.domain+'/')[1];
//   const decodePath = decodeURI(workingUrl).replace(' ', '');
//   const pathAsArray = decodePath.split('/');
//
//   return(
//     <div>
//       {
//         pathAsArray.map()
//       }
//     </div>
//   );
// };

const Breadcrumb = props => {
  const path = props.path;
  const defaultDomain = 'http://localhost:4000';
  const workingUrl = props.domain ? path.split(props.domain+'/')[1] : path.split(defaultDomain+'/')[1];
  const decodePath = decodeURI(workingUrl).replace(' ', '');
  const pathAsArray = decodePath.split('/');

  function createPath(pathAsArray, index){
    var path = defaultDomain;
    for (var i=0; i<index+1; i++){
      path = path + '/' + pathAsArray[i];
    }
    return path;
  }

  return(
    <div>
      {
        pathAsArray.map((a, index) => {
          if(index === pathAsArray.length-1){
            return <Link key={a+index} title={ a }
            />
          }
          return <Link key={a+index} title={ a + ' > '}
                       onClick={(e) => { window.location.href = createPath(pathAsArray, index) }}
                 />

        })
      }
    </div>
  );
};

Breadcrumb.propTypes = {

};

const Link = props => {
  return(
    <span>
    {
      (props.routerName) ? // if props.routerName
        <a href={props.routerName}
           onClick={props.onClick}
        >{props.title}</a>
      :
        <a href={props.path}
           onClick={props.onClick}
        >{props.title}</a>
    }
    </span>
  );
};

export default Breadcrumb;