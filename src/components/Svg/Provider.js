import React from "react";
import PropTypes from "prop-types";

import { Provider } from "./Context";

export default class SvgProvider extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
  };

  static defaultProps = {
    children: null
  };

  constructor(...args) {
    super(...args);
    this.tempCache = {};
    this.hasBeenMounted = false;
    this.state = { cache: {} };
  }

  componentDidMount() {
    this.hasBeenMounted = true;
    this.flushCache();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.children !== this.props.children ||
      nextState.cache !== this.state.cache
    );
  }

  flushCache = () => {
    Object.entries(this.tempCache).map(([id, { content, ...rest }]) =>
      this.addToCache(content, { id, ...rest })
    );

    this.tempCache = {};
  };

  addToCache = (content, { id, title, description }) => {
    if (!this.hasBeenMounted && !this.tempCache[id]) {
      this.tempCache[id] = { content, title, description };
      return;
    }

    const { cache } = this.state;
    if (cache[id]) return;

    this.setState({
      cache: { ...cache, [id]: { title, description, content } }
    });
  };

  renderSymbols = () => (
    <div style={{ transform: "translateX(-100%)" }}>
      <svg>{Object.entries(this.state.cache).map(this.renderSymbol)}</svg>
    </div>
  );

  renderSymbol = ([key, { title, description, content }]) => (
    <symbol key={key} id={key}>
      {title.length ? <title>{title}</title> : null}
      {description.length ? <desc>{description}</desc> : null}
      {content}
    </symbol>
  );

  render() {
    const { children } = this.props;
    return (
      <Provider value={this.addToCache}>
        <React.Fragment>
          {children}
          {this.renderSymbols()}
        </React.Fragment>
      </Provider>
    );
  }
}
