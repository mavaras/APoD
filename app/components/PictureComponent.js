import React from 'react';
import {
  Button, 
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import Popover from 'react-native-popover-view';
import RNFetchBlob from 'rn-fetch-blob';


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

  download() {
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    console.log(PictureDir);
    const date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        notification : true,
        title: 'title',
        path:  fs.dirs.DownloadDir + "/algo.jpg", //"/APoD_"+Math.floor(date.getTime() + date.getSeconds() / 2),
        fileCache: true,
        description : 'Downloading image.',
        mediaScannable: true,
      }
    };
    config(options).fetch('GET', 'https://blog.jscrambler.com/content/images/2018/12/jscrambler-blog-integrating-firebase-with-react-native-firebase-new-project.png')
    .then((res) => {
      console.log("success "+res.path());
    });
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
      <View style={{flex: 1}}>
        <TouchableHighlight ref={(r) => {this.image_ref = r}} onPress={this.showPopover.bind(this)} style={{'alignItems': 'center'}}>
          <Image
            style={{width: '90%', height: 300, marginTop: 20}}
            source={{uri: this.props.attrs.url}}
          />
        </TouchableHighlight>
        <Modal
          isVisible={this.state.popoverIsVisible}
          style={{flex: 1, 'flexDirection': 'row', alignItems: 'center', justifyContent: 'center'}}
          onBackdropPress={this.closePopover.bind(this)}
        >
          <View style={{flex: 1, height: 120, backgroundColor: 'white', 
                        'flexDirection': 'column', alignItems: 'center', justifyContent: 'center',
                        'borderRadius': 5}}>
            <View style={{'marginBottom': 30}}>
              <Text style={{fontSize: 19}}>Modal content</Text>
            </View>
            <View style={{'flexDirection': 'row', justifyContent: 'space-between'}}>
              <View style={{'paddingRight': 10, width: '40%'}}>
                <Icon.Button name="download" backgroundColor="#5b84c2" onPress={() => {this.download()}}>
                  <Text style={{'color': 'white'}}>Download</Text>
                </Icon.Button>
              </View>
              <View style={{'paddingLeft': 10, width: '40%'}}>
                <Icon.Button name="share-alt" backgroundColor="#5b84c2">
                  <Text style={{'color': 'white'}}>Share</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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