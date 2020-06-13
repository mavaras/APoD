import CameraRoll from '@react-native-community/cameraroll';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import {
  Animated, Dimensions,
  Platform,
  TouchableHighlight,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImgToBase64 from 'react-native-image-base64';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';

import Storage from '../../storage';
import { ThemeContext, useTheme } from '../../themes';
import { capitalize, formatDate, requestStoragePermissionAndroid } from '../../utils/utils';
import AnimationLayout from '../common/AnimationLayout';
import CarouselPictureList from '../common/CarouselImageList';
import Video from '../Video/VideoComponent';
import * as _ from './style';


const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

type RootStackParamList = {
  Explore: undefined;
  Settings: undefined;
  Picture: undefined;
  ExplorePicture: undefined;
};
interface Props {
  attrs: any,
  similars: Array<object>,
  navigation: StackNavigationProp<RootStackParamList, 'Picture'>,
}
function Picture({ attrs, similars, navigation }: Props) {
  const theme: ThemeContext = useTheme();
  const { t }: UseTranslationResponse = useTranslation();
  const downloadingAnimation = require('../../res/animations/planet.json');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openZoomModal, setOpenZoomModal] = useState<boolean>(false);
  let [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [, setButtonRect] = useState<object>({
    x: 0, y: 0, width: 0, height: 0,
  });
  const [scrollY] = useState(new Animated.Value(0));
  let imageRef: any;

  function download() {
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
  }

  function share() {
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
  }

  function zoom() {
    setOpenZoomModal(!openZoomModal);
  }

  async function _isFavourite() {
    const favourites = await Storage.getItem('@APODapp:favourites');
    const favouritesArray = JSON.parse(favourites);
    return favouritesArray.some((item: object) => item.title === attrs.title);
  }

  async function addFavourite() {
    setIsFavourite(true);
    const favourites = await Storage.getItem('@APODapp:favourites');
    let favouritesArray = [];
    if (favourites) {
      favouritesArray = JSON.parse(favourites);
      if (!await _isFavourite()) {
        favouritesArray.push(attrs);
      }
    } else {
      favouritesArray = [attrs];
    }
    await Storage.setItem('@APODapp:favourites', JSON.stringify(favouritesArray));
  }

  async function removeFavourite() {
    setIsFavourite(false);
    const favourites = await Storage.getItem('@APODapp:favourites');
    let favouritesArray = JSON.parse(favourites);
    favouritesArray = favouritesArray.filter((item: object) => attrs.title !== item.title);
    await Storage.setItem('@APODapp:favourites', JSON.stringify(favouritesArray));
  }

  async function handleFavourite() {
    if (isFavourite) {
      removeFavourite();
    } else {
      addFavourite();
    }
  }

  function showPopover() {
    imageRef.measure((width: number, height: number, x: number, y: number) => {
      setIsModalOpen(true);
      setButtonRect({
        x, y, width, height,
      });
    });
  }

  useEffect(() => {
    async function auxIsFavourite() {
      setIsFavourite(await _isFavourite());
    }
    auxIsFavourite();
    if (Platform.OS === 'android') {
      requestStoragePermissionAndroid();
    }
  }, []);

  const ImageScale = scrollY.interpolate({
    inputRange: [-100, 0, 200],
    outputRange: [1.5, 1.1, 1],
    extrapolate: 'clamp',
  });

  return (
    <_.SafeAreaView>
      <AnimationLayout
        animation={downloadingAnimation}
        text={t('picture.downloadingPicture')}
        render={downloading}
      />
      <Modal
        visible={openZoomModal}
        transparent={true}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, margin: 0 }}
      >
        <ImageViewer
          imageUrls={[{ url: attrs.url }]}
          enableImageZoom={true}
          enableSwipeDown={true}
          onSwipeDown={zoom}
        />
      </Modal>
      <TouchableHighlight
        style={{
          borderColor: 'white',
          marginLeft: '90%',
          width: 10,
          marginTop: 0,
          marginBottom: -20,
        }}
      >
        <Icon
          name="cog"
          size={22}
          iconStyle={{ color: 'white' }}
          style={{
            color: theme.getColors().buttonColor,
            backgroundColor: theme.getColors().bgColor,
            width: 60,
          }}
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
          <_.DialogContent>{t('picture.downloadPictureSuccess')}</_.DialogContent>
        </DialogContent>
      </Dialog>
      {!['youtube', 'vimeo'].some((aux) => attrs.url?.split(/[/.]/).includes(aux))
        ? (
          <_.TouchableHighlight
            ref={(r) => { imageRef = r; }}
            onPress={showPopover.bind(this)}
            underlayColor="none"
          >
            <View>
              <_.ImageShimmer
                pauseDuration={580}
                opacity={0.55}
              >
                <_.ShimmerInner />
              </_.ImageShimmer>
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
          </_.TouchableHighlight>
        )
        : (
          <Video
            style={[{ width: '100%', height: 350, marginBottom: -360 },
              { marginTop: attrs.explorePicture !== undefined ? 0 : 20 }]}
            url={attrs.url}
          />
        )}
      <Animated.ScrollView
        contentContainerStyle={
          [_.styles.animatedScrollView, { backgroundColor: theme.getColors().bgColor }]
        }
        overScrollMode="always"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
      >
        { attrs.date !== undefined
          ? (
            <View>
              <_.PictureInfoView>
                <_.PictureTitle>
                  {attrs.title}
                </_.PictureTitle>
                {attrs.author
                  ? (
                    <_.PictureAuthorView>
                      <_.PictureAuthorIcon name="camera" size={14} />
                      <_.PictureAuthorText>
                        {attrs.author}
                      </_.PictureAuthorText>
                    </_.PictureAuthorView>
                  ) : undefined}
                <_.PictureDescription>
                  {capitalize(attrs.explanation)}
                </_.PictureDescription>
              </_.PictureInfoView>
            </View>
          )
          : undefined }
        <_.PictureDateView>
          <_.PictureDateView2>
            <Icon name="calendar" size={26} style={{ color: theme.getColors().fontColor }} />
            <_.PictureDateText>
              {attrs.date ? formatDate(attrs.date) : undefined}
            </_.PictureDateText>
          </_.PictureDateView2>
        </_.PictureDateView>
        <_.PictureIconsView>
          <_.PictureIconsViewLeft>
            <_.PictureIconsIcon
              name="expand"
              size={18}
              iconStyle={[_.styles.iconStyle, { color: theme.getColors().iconColor }]}
              onPress={zoom}
            />
          </_.PictureIconsViewLeft>
          <_.PictureIconsViewRight>
            <_.PictureIconsIcon
              name="heart"
              size={18}
              iconStyle={[
                _.styles.iconStyle,
                isFavourite ? { color: '#f134d2' } : { color: theme.getColors().iconColor },
              ]}
              onPress={() => handleFavourite()}
            />
            <_.PictureIconsIcon
              name="download"
              size={18}
              iconStyle={[_.styles.iconStyle, { color: theme.getColors().iconColor }]}
              onPress={download}
            />
            <_.PictureIconsIcon
              name="share-alt"
              size={18}
              iconStyle={[_.styles.iconStyle, { color: theme.getColors().iconColor }]}
              onPress={share}
            />
          </_.PictureIconsViewRight>
        </_.PictureIconsView>
        <CarouselPictureList navigation={navigation} list={similars} />
      </Animated.ScrollView>
    </_.SafeAreaView>
  );
}

export default Picture;
