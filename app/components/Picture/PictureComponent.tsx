import React, { useState, useEffect } from 'react';
import {
  Text, Animated,
  TouchableHighlight,
  View, SafeAreaView, Platform,
} from 'react-native';
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import Shimmer from 'react-native-shimmer';
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
import { requestStorageRuntimePermissionAndroid, formatDate } from '../../utils';


const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

function Picture({ attrs, similars, navigation }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [loadingImage, setLoadingImage] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [, setButtonRect] = useState({
    x: 0, y: 0, width: 0, height: 0,
  });
  const [scrollY] = useState(new Animated.Value(0));
  let imageRef: any;
  let refs = React.createRef();

  useEffect(() => {
    this.refs = React.createRef();
    if (Platform.OS === 'android') {
      requestStorageRuntimePermissionAndroid();
    }
  }, []);

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
      <TouchableHighlight
        style={{
          borderColor: 'white',
          marginLeft: '90%',
          width: 10,
          marginTop: 39,
          position: 'absolute',
        }}
      >
        <Icon
          name="cog"
          size={22}
          iconStyle={{ color: 'black' }}
          style={{ backgroundColor: 'white', width: 60 }}
          onPress={() => navigation.navigate('Settings')}
        />
      </TouchableHighlight>
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
            <View>
              <Shimmer
                pauseDuration={580}
                opacity={0.55}
                style={{ justifyContent: 'center', marginTop: 20 }}
              >
                <Text style={{ height: 500, width: 500, backgroundColor: '#dadadae8' }} />
              </Shimmer>
              <AnimatedFastImage
                style={{
                  width: '100%',
                  height: 350,
                  marginTop: attrs.explorePicture !== undefined ? 0 : 20,
                  position: 'absolute',
                  transform: [{ scale: ImageScale }],
                }}
                source={{ uri: attrs.url }}
                onLoad={() => setLoadingImage(false)}
              />
            </View>
          </TouchableHighlight>
        )
        : (
          <Video
            style={{
              width: '100%',
              height: 350,
              marginTop: attrs.explorePicture !== undefined ? 0 : 20,
              marginBottom: -160,
            }}
            url={attrs.url}
          />
        )}
      <Animated.ScrollView
        overScrollMode="always"
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
                {attrs.author
                  ? (
                    <View style={{ flexDirection: 'row', marginTop: -23, marginBottom: 30 }}>
                      <Icon name="camera" size={14} style={{ color: 'black', marginTop: 2 }} />
                      <Text style={{ marginLeft: 10 }}>
                        {attrs.author}
                      </Text>
                    </View>
                  ) : undefined}
                <Text style={styles.textPictureExplanation}>
                  {attrs.explanation}
                </Text>
              </View>
            </View>
          )
          : undefined }
        <View style={styles.viewDate}>
          <View style={styles.viewDate2}>
            <Icon name="calendar" size={26} style={styles.viewDateIcon} />
            <Text style={styles.textDate}>
              {formatDate(attrs.date)}
            </Text>
          </View>
        </View>
        {Object.keys(similars).length !== 0
          ? (
            <View style={styles.viewSimilars}>
              <Text style={styles.textSimilars}>Similar Pictures</Text>
              <ScrollView
                style={styles.scrollViewSimilars}
                horizontal={true}
                contentContainerStyle={{ height: 300 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
              >
                {similars?.map((picture) => (
                  <TouchableHighlight
                    style={styles.touchableHighlightSimilars}
                    underlayColor="none"
                    onPress={() => {
                      navigation.push('Explore Picture', { attrs: picture });
                    }}
                  >
                    <FastImage
                      style={[styles.imageSmall, { height: 130, borderRadius: 7 }]}
                      source={{ uri: picture.url }}
                    />
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>
          )
          : undefined}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default Picture;
