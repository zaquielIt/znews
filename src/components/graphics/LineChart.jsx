import React, { Component } from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import XYAxis from "./lineSubComponents/xy-axis";
import Line from "./lineSubComponents/line";
import { line, curveMonotoneX } from "d3-shape";
import { extent } from "d3-array";
import { transition } from "d3-transition";

class LineChart extends Component {
  render() {
    const { data, data2, indexY, maxIndexYPos } = this.props;
    const parentWidth = 1000;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 40,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map((d) => d.indexX))
      .rangeRound([0, width]);

    const yScale = scaleLinear()
      .domain(extent(data, (d) => d[indexY[maxIndexYPos].name]))
      .range([height, 0])
      .nice();

    const lineGenerator = (lineNumber) => line()
      .x((d) => xScale(d.indexX))
      .y((d) => yScale(d[indexY[lineNumber].name]));
    return (
      <div>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t, data }} />
            <Line
              indexY={indexY}
              data={data}
              xScale={xScale}
              yScale={yScale}
              lineGenerator={lineGenerator}
              width={width}
              height={height}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
