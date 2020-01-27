import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  PermissionsAndroid
} from 'react-native';
import Share from 'react-native-share';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import RNFetchBlob from 'rn-fetch-blob';
import styles from './style';
import Video from '../Video/VideoComponent';


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
      downloading: false,
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
        path:  fs.dirs.PictureDir + '/APoD/APoD_' + this.props.attrs.title + '.png',
        fileCache: true,
        description : 'Downloading picture',
        mediaScannable: true,
      }
    };
    this.setState({
      downloading: true
    })
    config(options).fetch('GET', this.props.attrs.url)
    .then((res) => {
      console.log('Success downloading photo to path: ' + res.path());
      this.setState({
        downloading: false,
        isModalOpen: false
      });
    })
    .catch((err) => {
      console.log('Error occurred when trying to download picture: ' + err);
    });
  }

  share() {
    const base64 = RNFetchBlob.base64;
    let base64_url = base64.encode(this.props.attrs.url);
    const options = {
      message: 'test',
      url: 'data:image/jpeg;base64,' + base64_url
    };
    Share.open(options)
      .then((res) => { console.log("then: "+res); })
      .catch((err) => { err && console.log("catch: "+err); });
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
      <View>
        {!['youtube', 'vimeo'].some(aux => this.props.attrs.url.split(/[/.]/).includes(aux)) ?
          <TouchableHighlight
            ref={(r) => {this.image_ref = r}}
            onPress={this.showPopover.bind(this)}
            underlayColor='none'
            style={styles.touchableHighlight}
          >
            <Image
              style={this.props.attrs.date ? styles.image : this.props.extraStyle}
              source={{uri: this.props.attrs.url}}
            />
          </TouchableHighlight> :
          <Video url={this.props.attrs.url}/>
        }
        <Modal
          isVisible={this.state.isModalOpen}
          style={styles.modal}
          onBackdropPress={this.closeModal.bind(this)}
        >
          <View 
            style={styles.modalMainView}
          >
            <View style={styles.modalContentView}>
              <Text style={styles.modalTitle}>{this.props.attrs.title}</Text>
            </View>
            <View style={styles.modalFooterView}>
              <View style={styles.modalButtonGroupView}>
                <Icon.Button
                  disabled={this.state.downloading}
                  name="download"
                  style={styles.button}
                  onPress={() => { this.download(); }}
                >
                  <Text style={styles.buttonLabel}>Download</Text>
                </Icon.Button>
              </View>
              <View style={styles.modalButtonGroupView}>
                <Icon.Button
                  disabled={this.state.downloading}
                  name="share-alt"
                  style={styles.button}
                  onPress={() => { this.share(); }}
                >
                  <Text style={styles.buttonLabel}>Share</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
        </Modal>

        { this.props.attrs.date !== undefined ?
        <View>
          <View style={styles.viewPictureText}>
            <Text style={styles.textPictureTitle}>
              {this.props.attrs.title}
            </Text>

            <Text style={styles.textPictureExplanation}>
              {this.props.attrs.explanation}
            </Text>
          </View>

          <View>
            <Text style={styles.viewPictureDate}>
              {this.props.attrs.date}
            </Text>
          </View>
        </View> : undefined }
      </View>
    );
  }
}