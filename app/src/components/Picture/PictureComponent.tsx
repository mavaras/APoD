import CameraRoll from '@react-native-community/cameraroll';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import {
  Animated, Dimensions,
  LayoutChangeEvent,
  Platform,
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
import { PictureType } from '../../types';
import {
  capitalize, equalDates, formatDate,
  getTodayStringDate, log, requestStoragePermissionAndroid,
} from '../../utils/utils';
import AnimationLayout from '../common/AnimationLayout';
import CarouselPictureList from '../common/CarouselImageList';
import Video from '../Video/VideoComponent';
import * as _ from './style';
import { RootStackParamList } from '../../types';


const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

interface Props {
  attrs: PictureType,
  similars: Array<PictureType>,
  navigation: StackNavigationProp<RootStackParamList, 'Picture'>,
}
function Picture({ attrs, similars, navigation }: Props) {
  const theme: ThemeContext = useTheme();
  const { t }: UseTranslationResponse = useTranslation();
  const downloadingAnimation = require('../../res/animations/planet.json');
  const sharingAnimation = require('../../res/animations/planet2.json');

  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [openZoomModal, setOpenZoomModal] = useState<boolean>(false);
  const [, setLoadingImage] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [sharing, setSharing] = useState<boolean>(false);
  const [alreadyFavourite, setAlreadyFavourite] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [, setButtonRect] = useState<object>({
    x: 0, y: 0, width: 0, height: 0,
  });
  const [descriptionHeight, setDescriptionHeight] = useState<number>(400);
  const [scrollY] = useState<Animated.Value>(new Animated.Value(0));
  const ImageScale: Animated.AnimatedInterpolation = scrollY.interpolate({
    inputRange: [-100, 0, 200],
    outputRange: [1.6, 1.1, 1],
    extrapolate: 'clamp',
  });
  let imageRef: View;

  function download(): void {
    const { config, fs }: RNFetchBlob = RNFetchBlob;
    const pictureDir: string = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
    const picturePath: string = `${pictureDir}/APoD/APoD_${attrs.title}.png`;

    setDownloading(true);

    if (Platform.OS === 'android') {
      const options: object = {
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
          log(`Success downloading photo to path: ${res.path()}`);
          setDownloading(false);
        })
        .catch((err) => {
          log(`Error occurred when trying to download picture: ${err}`);
        });
    } else {
      CameraRoll.saveToCameraRoll(attrs.url)
        .then(() => {
          log('Success downloading photo to camera roll');
          setDownloading(false);
          setShowAlert(true);
        })
        .catch((err) => {
          log(`Error occurred when trying to download picture: ${err}`);
        });
    }
  }

  function share(): void {
    setSharing(true);
    ImgToBase64.getBase64String(attrs.url)
      .then((base64Url: string) => {
        setSharing(false);
        const options: object = {
          url: `data:image/png;base64,${base64Url}`,
        };
        Share.open(options)
          .catch((err: string) => {
            log(err);
          });
      })
      .catch((err: string) => log(err));
  }

  function zoom(): void {
    setOpenZoomModal(!openZoomModal);
  }

  async function isFavourite(): Promise<boolean> {
    const favourites: string | undefined = await Storage.getItem('@APODapp:favourites');
    let favouritesArray: Array<PictureType> = [];
    if (favourites) {
      favouritesArray = JSON.parse(favourites);
    }
    return favouritesArray.some((item: PictureType) => item.title === attrs.title);
  }

  function isVideo(): boolean {
    return ['youtube', 'vimeo'].some((videoEvidence: string) => attrs.url?.split(/[/.]/).includes(videoEvidence));
  }

  async function addFavourite(): Promise<void> {
    setAlreadyFavourite(true);
    const favourites: string | undefined = await Storage.getItem('@APODapp:favourites');
    let favouritesArray: Array<PictureType> = [];
    if (favourites) {
      favouritesArray = JSON.parse(favourites);
      if (!await isFavourite()) {
        favouritesArray.push(attrs);
      }
    } else {
      favouritesArray = [attrs];
    }
    await Storage.setItem('@APODapp:favourites', JSON.stringify(favouritesArray));
  }

  async function removeFavourite(): Promise<void> {
    setAlreadyFavourite(false);
    const favourites: string | undefined = await Storage.getItem('@APODapp:favourites');
    let favouritesArray: Array<PictureType> = [];
    if (favourites) {
      favouritesArray = JSON.parse(favourites);
    }
    favouritesArray = favouritesArray.filter((item: PictureType) => attrs.title !== item.title);
    await Storage.setItem('@APODapp:favourites', JSON.stringify(favouritesArray));
  }

  async function handleFavourite(): Promise<void> {
    if (alreadyFavourite) {
      removeFavourite();
    } else {
      addFavourite();
    }
  }

  function showPopover(): void {
    imageRef.measure((width: number, height: number, x: number, y: number) => {
      setButtonRect({
        x, y, width, height,
      });
    });
  }

  useEffect(() => {
    async function auxIsFavourite() {
      setAlreadyFavourite(await isFavourite());
    }
    auxIsFavourite();
    if (Platform.OS === 'android') {
      requestStoragePermissionAndroid();
    }
  }, []);

  return (
    <View style={{ height: '100%', marginTop: 0 }}>
      <AnimationLayout
        animation={downloadingAnimation}
        text={t('picture.downloadingPicture')}
        render={downloading}
      />
      <AnimationLayout
        animation={sharingAnimation}
        text={t('picture.sharePicturePrev')}
        render={sharing}
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
      {!isVideo()
        ? (
          <_.TouchableHighlight
            ref={(r: View) => { imageRef = r; }}
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
                  height: 360,
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
            style={[{
              width: '100%', height: 350, marginBottom: -360, zIndex: isScrolling ? 0 : 1,
            },
            { marginTop: attrs.explorePicture !== undefined ? 0 : 20 }]}
            url={attrs.url}
          />
        )}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          [_.styles.animatedScrollView,
            {
              backgroundColor: theme.getColors().bgColor,
              height: Dimensions.get('window').height + descriptionHeight
                + (!equalDates(attrs.date, getTodayStringDate()) ? -100 : 0),
            }]
        }
        overScrollMode="always"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
        onScrollBeginDrag={() => { if (!isScrolling) setIsScrolling(true); }}
        onScrollEndDrag={() => { if (isScrolling) setIsScrolling(false); }}
      >
        { attrs.date !== undefined
          ? (
            <View>
              <_.PictureInfoView
                onLayout={(event: LayoutChangeEvent) => {
                  setDescriptionHeight(event.nativeEvent.layout.height);
                }}
              >
                <_.PictureTitle>
                  {attrs.title}
                </_.PictureTitle>
                {attrs.author
                  ? (
                    <_.PictureAuthorView>
                      <_.PictureAuthorIcon name="camera" size={13} />
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
            {!isVideo()
              ? (
                <_.PictureIconsIcon
                  activeOpacity={1}
                  name="expand"
                  size={18}
                  iconStyle={[_.styles.iconStyle, { color: theme.getColors().iconColor }]}
                  onPress={zoom}
                />
              ) : undefined}
          </_.PictureIconsViewLeft>
          <_.PictureIconsViewRight>
            {!isVideo()
              ? (
                <>
                  <_.PictureIconsIcon
                    activeOpacity={1}
                    name="heart"
                    size={18}
                    iconStyle={[
                      _.styles.iconStyle,
                      alreadyFavourite ? { color: '#f134d2' } : { color: theme.getColors().iconColor },
                    ]}
                    onPress={() => handleFavourite()}
                  />
                  <_.PictureIconsIcon
                    activeOpacity={1}
                    name="download"
                    size={18}
                    iconStyle={[_.styles.iconStyle, { color: theme.getColors().iconColor }]}
                    onPress={download}
                  />
                </>
              ) : undefined}
            <_.PictureIconsIcon
              activeOpacity={1}
              name="share-alt"
              size={18}
              iconStyle={[_.styles.iconStyle, { color: theme.getColors().iconColor }]}
              onPress={share}
            />
          </_.PictureIconsViewRight>
        </_.PictureIconsView>
        <CarouselPictureList 
          navigation={navigation}
          list={similars}
        />
      </Animated.ScrollView>
    </View>
  );
}

export default Picture;
