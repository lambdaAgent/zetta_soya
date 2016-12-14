import React from 'react';

const Breadcrumb = props => {
  const array = props.items || [
      { title: 'Supplier Data', routerName: 'SUPPLIER'},
      { title: 'SUPPLIER ABC', routerName: 'SUPPLIER'},

  ];
  return(
    <div>
      {
        props.array.map((a, index) => {
          if(a.routerName){
            return <Link key={a+index} title={(index === props.array.length-1 ) ? a.title : a.title + ' > '}
                         onClick={(e) => {
                           console.log(e);
                           window.location = props.context.router.reverseRoute(a.routerName)
                         }}
                   />
          } else {
            return <Link key={a+index} title={(index === props.array.length-1 ) ? a.title : a.title + ' > '}
                         onClick={(e) => { window.location.href = a.path}}
                   />
          }
        })
      }
    </div>
  );
};

Breadcrumb.propTypes = {
  array: React.PropTypes.arrayOf(
    React.PropTypes.objectOf({
      title: React.PropTypes.string,
      routerName: React.PropTypes.string,
      path: React.PropTypes.string
    })
  ).isRequired,
  context: React.PropTypes.any.isRequired
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