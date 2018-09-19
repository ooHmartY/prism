import React from "react";
import PropTypes from "prop-types";

import { Consumer } from "./Context";

export default class Svg extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
  };

  static defaultProps = {
    children: null,
    description: "",
    title: ""
  };

  render() {
    const { children, title, description, id, ...props } = this.props;
    return (
      <Consumer>
        {addToCache => {
          if (addToCache) {
            addToCache(children, { id, title, description });
            return (
              <svg {...props}>
                <use xlinkHref={`#${id}`} />
              </svg>
            );
          }

          return (
            <svg {...props} id={id}>
              {title.length ? <title>{title}</title> : null}
              {description.length ? <desc>{description}</desc> : null}
              {children}
            </svg>
          );
        }}
      </Consumer>
    );
  }
}
