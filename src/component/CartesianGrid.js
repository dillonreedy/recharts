import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import createFragment from 'react-addons-create-fragment';

const PropTypes = React.PropTypes;

const CartesianGrid = React.createClass({

  propTypes: {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontalPoints: PropTypes.arrayOf(PropTypes.number),
    verticalPoints: PropTypes.arrayOf(PropTypes.number),

    fill: PropTypes.string,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      horizontal: true,
      vertical: true,
      // 水平线条的纵坐标
      horizontalPoints: [],
      // 竖直线条的横坐标
      verticalPoints: [],

      stroke: '#ccc',
      fill: 'none',
    };
  },
  /**
   * 绘制水平方向的线条
   * @return {Group} 图层
   */
  renderHorizontal() {
    const {x, y, width, height, horizontal, vertical, horizontalPoints,
        verticalPoints, ...others} = this.props;

    if (!horizontalPoints || !horizontalPoints.length) { return null; }

    const items = {};

    horizontalPoints.reduce((result, entry, i) => {
      items['line-' + i] = (
        <line key={'line-' + i} {...others} x1={x} y1={entry} x2={x + width} y2={entry}></line>
      );
    }, items);

    return (
      <g className="layer-grid-horizontal">
        {createFragment(items)}
      </g>
    );
  },
  /**
   * 绘制竖直方向的线条
   * @return {Group} 图层
   */
  renderVertical() {
    const {x, y, width, height, horizontal, vertical,
         horizontalPoints, verticalPoints, ...others} = this.props;

    if (!verticalPoints || !verticalPoints.length) { return null; }

    const items = {};

    verticalPoints.reduce((result, entry, i) => {
      items['line-' + i] = (
        <line key={'line-' + i} {...others} x1={entry} y1={y} x2={entry} y2={y + height}></line>
      );
    }, items);

    return (
      <g className="layer-grid-vertical">
        {createFragment(items)}
      </g>
    );
  },

  render() {
    const {width, height, horizontal, vertical} = this.props;

    if (width <= 0 || height <= 0) {
      return null;
    }

    return (
      <g className="layer-grid layer-cartesian-grid">
        {horizontal && this.renderHorizontal()}
        {vertical && this.renderVertical()}
      </g>
    );
  },
});

export default CartesianGrid;