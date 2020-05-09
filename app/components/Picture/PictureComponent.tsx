import React, { useState, useEffect } from 'react';
import {
  Text, Animated,
  TouchableHighlight,
  View, SafeAreaView, Platform, Image,
} from 'react-native';
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import FastImage from 'react-native-fast-image';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
import Video from '../Video/VideoComponent';
import { requestStorageRuntimePermissionAndroid } from '../../utils';


function Picture({ attrs, similars }: {[string: string]: any}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [, setButtonRect] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });
  const [scrollY] = useState(new Animated.Value(0));
  let imageRef: any;

  useEffect(() => {
    this.refs = React.createRef();
    if (Platform.OS === 'android') {
      requestStorageRuntimePermissionAndroid();
    }
  });

  const download = () => {
    const { config, fs } = RNFetchBlob;
    const pictureDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
    const picturePath = `${pictureDir}/APoD/APoD_${attrs.title}.png`;

    setDownloading(true);

    if (Platform.OS === 'android') {
      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'APoD picture download',
          path: picturePath,
          fileCache: true,
          description: 'Downloading picture',
          mediaScannable: true,
        },
      };
      config(options).fetch('GET', attrs.url)
        .then((res) => {
          console.log(`Success downloading photo to path: ${res.path()}`);
          setDownloading(false);
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(`Error occurred when trying to download picture: ${err}`);
        });
    } else {
      CameraRoll.saveToCameraRoll(attrs.url)
        .then(() => {
          console.log('Success downloading photo to camera roll');
          setDownloading(false);
          setIsModalOpen(false);
          setShowAlert(true);
        })
        .catch((err) => {
          console.log(`Error occurred when trying to download picture: ${err}`);
        });
    }
  };

  const share = () => {
    ImgToBase64.getBase64String(attrs.url)
      .then((base64Url: string) => {
        const options = {
          url: `data:image/png;base64,${base64Url}`,
        };
        Share.open(options)
          .catch((err: string) => {
            console.log(err);
          });
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  const showPopover = () => {
    imageRef.measure((width: number, height: number, x: number, y: number) => {
      setIsModalOpen(true);
      setButtonRect({
        x, y, width, height,
      });
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ImageScale = scrollY.interpolate({
    inputRange: [-100, 0, 200],
    outputRange: [1.5, 1.1, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Dialog
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        dialogTitle={<DialogTitle title="APoD" />}
        footer={(
          <DialogFooter>
            <DialogButton
              text="OK"
              onPress={() => { setShowAlert(false); }}
            />
          </DialogFooter>
        )}
        visible={showAlert}
        onTouchOutside={() => {
          setShowAlert(false);
        }}
      >
        <DialogContent>
          <Text style={styles.dialogContent}>Photo succesfully downloaded!</Text>
        </DialogContent>
      </Dialog>
      {!['youtube', 'vimeo'].some((aux) => attrs.url.split(/[/.]/).includes(aux))
        ? (
          <TouchableHighlight
            ref={(r) => { imageRef = r; }}
            onPress={showPopover.bind(this)}
            underlayColor="none"
            style={{
              height: 200,
              marginTop: 20,
              backgroundColor: 'white',
            }}
          >
            <Animated.Image
              style={{
                width: '100%',
                height: 350,
                marginTop: attrs.explorePicture !== undefined ? 0 : 20,
                position: 'absolute',
                transform: [{ scale: ImageScale }],
              }}
              source={{ uri: attrs.url }}
            />
          </TouchableHighlight>
        )
        : (<Video url={attrs.url} />)}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
      >
        <Modal
          isVisible={isModalOpen}
          style={styles.modal}
          onBackdropPress={closeModal.bind(this)}
        >
          <View style={styles.modalMainView}>
            <View style={styles.modalContentView}>
              <Text style={styles.modalTitle}>{attrs.title}</Text>
            </View>
            <View style={styles.modalFooterView}>
              <View style={styles.modalButtonGroupView}>
                <Icon.Button
                  disabled={downloading}
                  name="download"
                  style={styles.button}
                  onPress={() => { download(); }}
                >
                  <Text style={styles.buttonLabel}>Download</Text>
                </Icon.Button>
              </View>
              <View style={styles.modalButtonGroupView}>
                <Icon.Button
                  disabled={downloading}
                  name="share-alt"
                  style={styles.button}
                  onPress={() => { share(); }}
                >
                  <Text style={styles.buttonLabel}>Share</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
        </Modal>
        { attrs.date !== undefined
          ? (
            <View>
              <View style={styles.viewPictureText}>
                <Text style={styles.textPictureTitle}>
                  {attrs.title}
                </Text>
                <Text style={styles.textPictureExplanation}>
                  {attrs.explanation}
                </Text>
              </View>
              <View>
                <Text style={styles.viewPictureDate}>
                  {attrs.date}
                </Text>
              </View>
            </View>
          )
          : undefined }
        {Object.keys(similars).length !== 0 ?
          <View
            style={{
              marginLeft: '5%',
              marginRight: '5%',
              marginBottom: 10, marginTop: 60
            }}>
            <Text style={{ fontWeight: '600', fontSize: 20, marginBottom: 30 }}>
              Similar Pictures
            </Text>
            <ScrollView
              style={{ backgroundColor: "white" }}
              horizontal={true}
              contentContainerStyle={{
                height: 300 }}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={200}
              decelerationRate="fast"
              pagingEnabled
            >
              {similars?.map((picture) =>
              <View style={{ marginRight: 5, width: 130, }}>
                <Image style={[styles.imageSmall, {height: 130, borderRadius: 7}]}
                  source={{ uri: picture.url }}
                />
              </View>
              )}
            </ScrollView>
          </View> : undefined}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default Picture;
