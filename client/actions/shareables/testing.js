class test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    };
    this.getDimensions = this.getDimensions.bind(this);
  }

  componentDidMount() {
    const tempHeight = this.refs.lineGraph.innerHeight;
    const tempWidth = this.refs.lineGraph.innerWidth;
    this.getDimensions(tempHeight, tempWidth);
  }

  getDimensions = (height, width) => {
    console.log(height, width);
    this.setState({
      height,
      width,
    })
  }

  render() {
    return(
      <div ref="lineGraph">
        hello world
      </div>
    );
  }

}
