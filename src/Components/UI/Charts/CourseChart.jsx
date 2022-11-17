import React from "react";
import {defaultChartData} from './defaultProps.js'
import { PropTypes } from 'prop-types';

import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const CourseChart = ({dataController}) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%" aspect={3 / 1}>
        <BarChart
          data={dataController}
          margin={{
            top: 10,
            right: 10,
            left: -35,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="day"
            axisLine={{ stroke: "#EAF0F4" }}
            tickLine={false}
            padding={{ left: 10 }}
            
           
          ></XAxis>
          <YAxis
            axisLine={{ stroke: "#EAF0F4" }}
            stroke="#ADB4C5"
            dataKey={"x"}
            name="stature"
            tickLine={false}
            ticks={[0, 2, 4, 6, 8]}
            domain={[0, 8]}
            type="number"
          />
          <Bar dataKey="lineRange">
            {dataController.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index <= 6 ? "#F9D0EC" : "#E015A2"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseChart;

CourseChart.propTypes = {
  dataController: PropTypes.array
}
CourseChart.defaultProps ={
  dataController : defaultChartData
}
