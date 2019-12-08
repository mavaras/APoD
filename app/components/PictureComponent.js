import React from 'react';
import { 
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Popover from 'react-native-popover-view';


export default class Picture extends React.Component {
  constructor() {
    super();
    this.state = {
      popoverIsVisible: false,
      buttonRect: {x: 0, y: 0, width: 0, height: 0}
    };
  }

  componentDidMount() {
    this.refs = React.createRef();
  }

  getInitialState() {
    return {
      popoverIsVisible: false,
      buttonRect: {},
    };
  }

  showPopover() {
    this.image_ref.measure((ox, oy, width, height, px, py) => {
      this.setState({
        popoverIsVisible: true,
        buttonRect: {x: px, y: py, width: width, height: height}
      });
    });
  }
  
  closePopover() {console.log("·");
    this.setState({ popoverIsVisible: false });
  }

  render() {
    return (
      <View>
        {/*<TouchableHighlight ref={(r) => {this.image_ref = r}} onPress={this.showPopover.bind(this)} style={{'alignItems': 'center'}}>
          <Image
            style={{width: '90%', height: 300, marginTop: 20}}
            source={{uri: this.props.attrs.url}}
          />
        </TouchableHighlight>
        <Popover
          isVisible={this.state.popoverIsVisible}
          fromView={this.image_ref}
          onClose={() => {console.log("!")}}
          >
          <Text>I'm the content of this popover!</Text>
        </Popover>*/}

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: '90%', height: 300, marginTop: 20}}
            source={{uri: this.props.attrs.url}}
          />
          <Text style={{marginTop: 40, marginBottom: 10, fontSize: 19, textAlign: 'justify', fontWeight: 'bold'}}>
            {this.props.attrs.title}
          </Text>

          <Text style={{width: '90%', alignItems: 'center'}}>
            {this.props.attrs.explanation}
          </Text>
        </View>

        <View>
          <Text style={{marginTop: 40, marginBottom: 15, textAlign: 'right', marginRight: '25%'}}>
            {this.props.attrs.date}
          </Text>
        </View>
      </View>
    );
  }
}