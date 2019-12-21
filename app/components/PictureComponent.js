import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  PermissionsAndroid
} from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import RNFetchBlob from 'rn-fetch-blob';


export async function request_storage_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'ReactNativeCode Storage Permission',
        'message': 'ReactNativeCode App needs access to your storage to download Photos.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Storage Permission Granted");
    }
    else {
      console.log("Storage Permission Not Granted");
    }
  } 
  catch (err) {
    console.log('Some error while granting storage access: ' + err);
  }
}

export default class Picture extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      buttonRect: {x: 0, y: 0, width: 0, height: 0}
    };
  }

  async componentDidMount() {
    this.refs = React.createRef();
    await request_storage_runtime_permission();
  }

  getInitialState() {
    return {
      popoverIsVisible: false,
      buttonRect: {},
    };
  }

  download() {
    const { config, fs } = RNFetchBlob;
    const date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager: true,
        notification : true,
        title: 'APoD picture download',
        path:  fs.dirs.PictureDir + '/APoD_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.png',
        fileCache: true,
        description : 'Downloading picture',
        mediaScannable: true,
      }
    };
    config(options).fetch('GET', this.props.attrs.url)
    .then((res) => {
      console.log('Success downloading photo to path: ' + res.path());
      this.setState({
        isModalOpen: false
      });
    })
    .catch((err) => {
      console.log('Error occurred when trying to download picture: ' + err);
    });
  }

  showPopover() {
    this.image_ref.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isModalOpen: true,
        buttonRect: {x: px, y: py, width: width, height: height}
      });
    });
  }
  
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight
          ref={(r) => {this.image_ref = r}}
          onPress={this.showPopover.bind(this)}
          style={{'alignItems': 'center'}}
        >
          <Image
            style={{width: '90%', height: 300, marginTop: 20}}
            source={{uri: this.props.attrs.url}}
          />
        </TouchableHighlight>
        <Modal
          isVisible={this.state.isModalOpen}
          style={{flex: 1, 'flexDirection': 'row', alignItems: 'center', justifyContent: 'center'}}
          onBackdropPress={this.closeModal.bind(this)}
        >
          <View 
            style={{flex: 1, height: 120, backgroundColor: 'white', 
                    'flexDirection': 'column', alignItems: 'center', justifyContent: 'center',
                    'borderRadius': 5}}
          >
            <View style={{'marginBottom': 30}}>
              <Text style={{fontSize: 19}}>Modal content</Text>
            </View>
            <View style={{'flexDirection': 'row', justifyContent: 'space-between'}}>
              <View style={{'paddingRight': 10, width: '40%'}}>
                <Icon.Button
                  name="download"
                  backgroundColor="#5b84c2"
                  onPress={() => { this.download(); }}
                >
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
          <Text style={{marginTop: 40, width: '90%', marginBottom: 10, fontSize: 19, textAlign: 'center', fontWeight: 'bold'}}>
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