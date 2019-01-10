import React, { Component } from "react";
import ChartTypeChooser from "../components/ChartTypeChooser";
import ChartDimensionSelector from "../components/ChartDimensionSelector";
import PropTypes from 'prop-types';
import columnHeaders from "../columnHeaders";
import columnData from "../columnData";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

class ChartPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xName: undefined,
      yName: undefined,
      xData: undefined,
      yData: undefined,
      chartType: "Line",
      columnNames: columnHeaders
    }

    this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
    this.setXValues = this.setXValues.bind(this);
    this.setYValues = this.setYValues.bind(this);

  }

  setXValues = (event) => {
    const chosenX = event.target.value;
    const columnChosen = columnHeaders.indexOf(chosenX);
    const data = [];
    columnData.forEach(row => data.push(row[columnChosen]));
    console.log(data);

    this.setState({
      xName: chosenX,
      xData: data
    })
  };

  setYValues = (event) => {
    const chosenY = event.target.value;
    const columnChosen = columnHeaders.indexOf(chosenY);
    const data = [];
    columnData.forEach(row => data.push(row[columnChosen]));
    console.log(data);
    this.setState({
      yName: chosenY,
      yData: data
    })
  };

  handleChartTypeChange = (event) => {
    this.setState({
      chartType: event.target.value
    });
  };

  render() {
    return (
      <div>
        <ChartTypeChooser
          handleOptionChange={this.handleChartTypeChange} chartType={this.state.chartType}
        />
        <div>
          Choose X Axis
          <ChartDimensionSelector
            options={this.state.columnNames} handleSelection={this.setXValues}
          />
        </div>
        <div>
          Choose Y Axis
          <ChartDimensionSelector
            options={this.state.columnNames} handleSelection={this.setYValues}
          />
        </div>

        <div>
          {
            this.state.chartType === "Line" ?
              <LineChart
                yData={this.state.yData}
                xData={this.state.xData}
                xName={this.state.xName}
                yName={this.state.yName} /> :
              <BarChart
                yData={this.state.yData}
                xData={this.state.xData}
                xName={this.state.xName}
                yName={this.state.yName} />
          }

        </div>

      </div>

    );
  }
}
const styles = {
};

export default ChartPage;
