import { NativeModules } from 'react-native';
import {
  CameraErrorEnum,
  CaptureStatusEnum,
  ChargingStateEnum,
  getThetaInfo,
  initialize,
  ShootingFunctionEnum,
  Options,
  getThetaState,
  listFiles,
  FileTypeEnum,
  deleteFiles,
  deleteAllFiles,
  deleteAllImageFiles,
  deleteAllVideoFiles,
  getOptions,
  setOptions,
  OptionNameEnum,
  ApertureEnum,
  CaptureModeEnum,
  getLivePreview,
  stopLivePreview,
  getPhotoCaptureBuilder,
  PhotoCaptureBuilder,
  ExposureCompensationEnum,
  ExposureDelayEnum,
  ExposureProgramEnum,
  FilterEnum,
  PhotoFileFormatEnum,
  GpsTagRecordingEnum,
  IsoEnum,
  IsoAutoHighLimitEnum,
  WhiteBalanceEnum,
  PhotoCapture,
  getVideoCaptureBuilder,
  VideoCapture,
  VideoCaptureBuilder,
  VideoFileFormatEnum,
  MaxRecordableTimeEnum,
  finishWlan,
  getMetadata,
  MetaInfo,
  reset,
  stopSelfTimer,
  convertVideoFormats,
  cancelVideoConvert,
  setBluetoothDevice,
  listAccessPoints,
  AuthModeEnum,
  setAccessPointDynamically,
  setAccessPointStatically,
  deleteAccessPoint,
} from '..';

jest.mock('react-native', () => {
  return {
    NativeModules: {
      ThetaClientReactNative: {},
    },
    Platform: {
      select: jest.fn(),
    },
  };
});

const thetaClient = NativeModules.ThetaClientReactNative;

test('Call initialize normal', async () => {
  const endpoint = 'http://192.168.1.1:80';
  thetaClient.initialize = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await initialize(endpoint);

  expect(thetaClient.initialize).toHaveBeenCalledWith(endpoint);
  expect(res).toBe(true);
});

test('Exception for call initialize', async () => {
  const endpoint = 'http://192.168.1.1:80';
  thetaClient.initialize = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await initialize(endpoint);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.initialize).toHaveBeenCalledWith(endpoint);
});

it.todo('write getThetaInfo test for THETA X, V, SC, S.');

test('Call getThetaInfo normal for THETA Z1', async () => {
  const manufacturer = 'RICOH';
  const model = 'RICOH THETA Z1';
  const serialNumber = '10100001';
  const wlanMacAddress = '00:45:78:bc:45:67';
  const bluetoothMacAddress = '00:45:de:78:3e:33';
  const firmwareVersion = '2.20.3';
  const supportUrl = 'https://theta360.com/en/support/';
  const hasGps = false;
  const hasGyro = true;
  const uptime = 67;
  const api = [
    '/osc/info',
    '/osc/state',
    '/osc/checkForUpdates',
    '/osc/commands/execute',
    '/osc/commands/status',
  ];
  const endpoints = {
    httpPort: 80,
    httpUpdatesPort: 80,
  };
  const apiLevel = [1, 2];
  thetaClient.getThetaInfo = jest.fn().mockImplementation(
    jest.fn(async () => {
      return {
        manufacturer,
        model,
        serialNumber,
        wlanMacAddress,
        bluetoothMacAddress,
        firmwareVersion,
        supportUrl,
        hasGps,
        hasGyro,
        uptime,
        api,
        endpoints,
        apiLevel,
      };
    })
  );

  const res = await getThetaInfo();
  expect(thetaClient.getThetaInfo).toBeCalled();
  expect(res.manufacturer).toBe(manufacturer);
  expect(res.model).toBe(model);
  expect(res.serialNumber).toBe(serialNumber);
  expect(res.wlanMacAddress).toBe(wlanMacAddress);
  expect(res.bluetoothMacAddress).toBe(bluetoothMacAddress);
  expect(res.firmwareVersion).toBe(firmwareVersion);
  expect(res.supportUrl).toBe(supportUrl);
  expect(res.hasGps).toBe(hasGps);
  expect(res.hasGyro).toBe(hasGyro);
  expect(res.uptime).toBe(uptime);
  expect(res.api).toStrictEqual(api);
  expect(res.endpoints).toStrictEqual(endpoints);
  expect(res.apiLevel).toStrictEqual(apiLevel);
});

test('Exception for call getThetaInfo', async () => {
  thetaClient.getThetaInfo = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await getThetaInfo();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getThetaInfo).toBeCalled();
});

it.todo('write getThetaState test for THETA X, V, SC, S.');

test('Call getThetaState normal for THETA Z1', async () => {
  const fingerprint = 'FIG_0001';
  const batteryLevel = 0.81;
  const storageUri =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/';
  const storageID = null;
  const captureStatus = CaptureStatusEnum.IDLE;
  const recordedTime = 0;
  const recordableTime = 0;
  const capturedPictures = 0;
  const compositeShootingElapsedTime = 0;
  const latestFileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R0010010.JPG';
  const chargingState = ChargingStateEnum.NOT_CHARGING;
  const apiVersion = 2;
  const isPluginRunning = false;
  const isPluginWebServer = true;
  const _function = ShootingFunctionEnum.SELF_TIMER;
  const isMySettingChanged = false;
  const currentMicrophone = null;
  const isSdCard = false;
  const cameraError = [CameraErrorEnum.COMPASS_CALIBRATION];
  const isBatteryInsert = null;
  thetaClient.getThetaState = jest.fn().mockImplementation(
    jest.fn(async () => {
      return {
        fingerprint,
        batteryLevel,
        storageUri,
        storageID,
        captureStatus,
        recordedTime,
        recordableTime,
        capturedPictures,
        compositeShootingElapsedTime,
        latestFileUrl,
        chargingState,
        apiVersion,
        isPluginRunning,
        isPluginWebServer,
        function: _function,
        isMySettingChanged,
        currentMicrophone,
        isSdCard,
        cameraError,
        isBatteryInsert,
      };
    })
  );
  const res = await getThetaState();
  expect(thetaClient.getThetaState).toBeCalled();
  expect(res.fingerprint).toBe(fingerprint);
  expect(res.batteryLevel).toBe(batteryLevel);
  expect(res.storageUri).toBe(storageUri);
  expect(res.storageID).toBe(storageID);
  expect(res.captureStatus).toBe(captureStatus);
  expect(res.recordedTime).toBe(recordableTime);
  expect(res.recordableTime).toBe(recordableTime);
  expect(res.capturedPictures).toBe(capturedPictures);
  expect(res.compositeShootingElapsedTime).toBe(compositeShootingElapsedTime);
  expect(res.latestFileUrl).toBe(latestFileUrl);
  expect(res.chargingState).toBe(chargingState);
  expect(res.apiVersion).toBe(apiVersion);
  expect(res.isPluginRunning).toBe(isPluginRunning);
  expect(res.isPluginWebServer).toBe(isPluginWebServer);
  expect(res.function).toBe(_function);
  expect(res.isMySettingChanged).toBe(isMySettingChanged);
  expect(res.currentMicrophone).toBe(currentMicrophone);
  expect(res.isSdCard).toBe(isSdCard);
  expect(res.cameraError).toStrictEqual(cameraError);
  expect(res.isBatteryInsert).toBe(isBatteryInsert);
});

test('Exception for call getThetaState', async () => {
  thetaClient.getThetaState = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await getThetaState();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getThetaState).toBeCalled();
});

test('Call listFiles normal', async () => {
  const fileTypeEnum = FileTypeEnum.IMAGE;
  const startPosition = 10;
  const entryCount = 10;
  const name = 'R00100010.JPG';
  const size = 4051440;
  const dateTime = '2015:07:10 11:05:18';
  const thumbnailUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG?type=thumb';
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG';
  const totalEntries = 10;
  thetaClient.listFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      return {
        fileList: [
          {
            name,
            size,
            dateTime,
            thumbnailUrl,
            fileUrl,
          },
        ],
        totalEntries,
      };
    })
  );

  const res = await listFiles(fileTypeEnum, startPosition, entryCount);
  expect(thetaClient.listFiles).toHaveBeenCalledWith(
    fileTypeEnum,
    startPosition,
    entryCount
  );
  expect(res.fileList[0]?.name).toBe(name);
  expect(res.fileList[0]?.size).toBe(size);
  expect(res.fileList[0]?.dateTime).toBe(dateTime);
  expect(res.fileList[0]?.thumbnailUrl).toBe(thumbnailUrl);
  expect(res.fileList[0]?.fileUrl).toBe(fileUrl);
  expect(res.totalEntries).toBe(totalEntries);
});

test('Exception for call listFiles', async () => {
  const fileTypeEnum = FileTypeEnum.IMAGE;
  const startPosition = 10;
  const entryCount = 10;
  thetaClient.listFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await listFiles(fileTypeEnum, startPosition, entryCount);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }

  expect(thetaClient.listFiles).toHaveBeenCalledWith(
    fileTypeEnum,
    startPosition,
    entryCount
  );
});

test('Call deleteFiles normal', async () => {
  const fileUrls = [
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG',
  ];
  thetaClient.deleteFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await deleteFiles(fileUrls);
  expect(thetaClient.deleteFiles).toHaveBeenCalledWith(fileUrls);
  expect(res).toBe(true);
});

test('Exception for call deleteFiles', async () => {
  const fileUrls = [
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG',
  ];
  thetaClient.deleteFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await deleteFiles(fileUrls);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.deleteFiles).toHaveBeenCalledWith(fileUrls);
});

test('Call deleteAllFiles normal', async () => {
  thetaClient.deleteAllFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await deleteAllFiles();
  expect(thetaClient.deleteAllFiles).toBeCalled();
  expect(res).toBe(true);
});

test('Exception for call deleteAllFiles', async () => {
  thetaClient.deleteAllFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await deleteAllFiles();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.deleteAllFiles).toBeCalled();
});

test('Call deleteAllImageFiles normal', async () => {
  thetaClient.deleteAllImageFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await deleteAllImageFiles();
  expect(thetaClient.deleteAllImageFiles).toBeCalled();
  expect(res).toBe(true);
});

test('Exception for call deleteAllImageFiles', async () => {
  thetaClient.deleteAllImageFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await deleteAllImageFiles();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.deleteAllImageFiles).toBeCalled();
});

test('Call deleteAllVideoFiles normal', async () => {
  thetaClient.deleteAllVideoFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await deleteAllVideoFiles();
  expect(thetaClient.deleteAllVideoFiles).toBeCalled();
  expect(res).toBe(true);
});

test('Exception for call deleteAllVideoFiles', async () => {
  thetaClient.deleteAllVideoFiles = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await deleteAllVideoFiles();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.deleteAllVideoFiles).toBeCalled();
});

test('Call getOptions normal', async () => {
  const options: Options = {
    aperture: ApertureEnum.APERTURE_2_0,
    captureMode: CaptureModeEnum.IMAGE,
  };
  thetaClient.getOptions = jest.fn().mockImplementation(
    jest.fn(async () => {
      return options;
    })
  );

  const optionsName = [OptionNameEnum.CaptureMode, OptionNameEnum.GpsInfo];
  const res = await getOptions(optionsName);
  expect(thetaClient.getOptions).toHaveBeenCalledWith(optionsName);
  expect(res).toStrictEqual(options);
});

test('Exception for call getOptions', async () => {
  thetaClient.getOptions = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  const optionsName = [OptionNameEnum.CaptureMode, OptionNameEnum.GpsInfo];
  try {
    await getOptions(optionsName);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getOptions).toHaveBeenCalledWith(optionsName);
});

test('Call setOptions normal', async () => {
  thetaClient.setOptions = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );
  const options: Options = {
    aperture: ApertureEnum.APERTURE_2_0,
    captureMode: CaptureModeEnum.IMAGE,
  };
  const res = await setOptions(options);
  expect(thetaClient.setOptions).toHaveBeenCalledWith(options);
  expect(res).toBeTruthy();
});

test('Exception for call setOptions', async () => {
  thetaClient.setOptions = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );
  const options: Options = {
    aperture: ApertureEnum.APERTURE_2_0,
    captureMode: CaptureModeEnum.IMAGE,
  };
  try {
    await setOptions(options);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.setOptions).toHaveBeenCalledWith(options);
});

test('Call getLivePreview normal', async () => {
  thetaClient.getLivePreview = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );
  const res = await getLivePreview();
  expect(thetaClient.getLivePreview).toBeCalled();
  expect(res).toBeTruthy();
});

test('Exception for call getLivePreview', async () => {
  thetaClient.getLivePreview = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );
  try {
    await getLivePreview();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getLivePreview).toBeCalled();
});

test('Call stopLivePreview normal', () => {
  thetaClient.stopLivePreview = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );
  stopLivePreview();
  expect(thetaClient.stopLivePreview).toBeCalled();
});

test('Exception for call stopLivePreview', () => {
  thetaClient.stopLivePreview = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );
  try {
    stopLivePreview();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.stopLivePreview).toBeCalled();
});

test('Call getPhotoCaptureBuilder normal', () => {
  thetaClient.getPhotoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );
  const res = getPhotoCaptureBuilder();
  expect(thetaClient.getPhotoCaptureBuilder).toBeCalled();
  expect(res).toBeInstanceOf(PhotoCaptureBuilder);
});

test('Exception for call getPhotoCaptureBuilder', () => {
  thetaClient.getPhotoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );
  try {
    getPhotoCaptureBuilder();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getPhotoCaptureBuilder).toBeCalled();
});

test('Call buildPhotoCapture normal', async () => {
  const aperature = ApertureEnum.APERTURE_2_0;
  const colorTemperature = 2;
  const exposureCompensation = ExposureCompensationEnum.M_0_3;
  const exposureDelay = ExposureDelayEnum.DELAY_1;
  const exposureProgram = ExposureProgramEnum.APERTURE_PRIORITY;
  const fileFormat = PhotoFileFormatEnum.IMAGE_11K;
  const filter = FilterEnum.HDR;
  const gpsInfo = {
    latitude: 1.0,
    longitude: 2.0,
    altitude: 3.0,
    dateTimeZone: '2022:01:01 00:01:00+09:00',
  };
  const gpsTagRecording = GpsTagRecordingEnum.ON;
  const iso = IsoEnum.ISO_100;
  const isoAutoHighLimit = IsoAutoHighLimitEnum.ISO_125;
  const whiteBalance = WhiteBalanceEnum.AUTO;

  thetaClient.getPhotoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildPhotoCapture = jest.fn().mockImplementation(
    jest.fn(async (options: Options) => {
      expect(options.aperture).toBe(aperature);
      expect(options.colorTemperature).toBe(colorTemperature);
      expect(options.exposureCompensation).toBe(exposureCompensation);
      expect(options.exposureDelay).toBe(exposureDelay);
      expect(options.exposureProgram).toBe(exposureProgram);
      expect(options.fileFormat).toBe(fileFormat);
      expect(options.filter).toBe(filter);
      expect(options.gpsInfo).toStrictEqual(gpsInfo);
      expect(options._gpsTagRecording).toBe(gpsTagRecording);
      expect(options.iso).toBe(iso);
      expect(options.isoAutoHighLimit).toBe(isoAutoHighLimit);
      expect(options.whiteBalance).toBe(whiteBalance);
      return true;
    })
  );

  const res = await getPhotoCaptureBuilder()
    .setAperture(aperature)
    .setColorTemperature(colorTemperature)
    .setExposureCompensation(exposureCompensation)
    .setExposureDelay(exposureDelay)
    .setExposureProgram(exposureProgram)
    .setFileFormat(fileFormat)
    .setFilter(filter)
    .setGpsInfo(gpsInfo)
    .setGpsTagRecording(gpsTagRecording)
    .setIso(iso)
    .setIsoAutoHighLimit(isoAutoHighLimit)
    .setWhiteBalance(whiteBalance)
    .build();
  expect(thetaClient.buildPhotoCapture).toBeCalled();
  expect(res).toBeInstanceOf(PhotoCapture);
});

test('Exception for call buildPhotoCapture', async () => {
  thetaClient.getPhotoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildPhotoCapture = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );

  try {
    await getPhotoCaptureBuilder().build();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getPhotoCaptureBuilder).toBeCalled();
});

test('Call takePicture normal', async () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG';
  thetaClient.getPhotoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildPhotoCapture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  thetaClient.takePicture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return fileUrl;
    })
  );

  const res = await (await getPhotoCaptureBuilder().build()).takePicture();
  expect(thetaClient.takePicture).toBeCalled();
  expect(res).toBe(fileUrl);
});

test('Exception for call takePicture normal', async () => {
  thetaClient.getPhotoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildPhotoCapture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  thetaClient.takePicture = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );

  try {
    await (await getPhotoCaptureBuilder().build()).takePicture();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.takePicture).toBeCalled();
});

test('Call getVideoCaptureBuilder normal', () => {
  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );
  const res = getVideoCaptureBuilder();
  expect(thetaClient.getVideoCaptureBuilder).toBeCalled();
  expect(res).toBeInstanceOf(VideoCaptureBuilder);
});

test('Exception for call getVideoCaptureBuilder', () => {
  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );
  try {
    getVideoCaptureBuilder();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getVideoCaptureBuilder).toBeCalled();
});

test('Call buildVideoCapture normal', async () => {
  const aperature = ApertureEnum.APERTURE_2_0;
  const colorTemperature = 2;
  const exposureCompensation = ExposureCompensationEnum.M_0_3;
  const exposureDelay = ExposureDelayEnum.DELAY_1;
  const exposureProgram = ExposureProgramEnum.APERTURE_PRIORITY;
  const fileFormat = VideoFileFormatEnum.VIDEO_2K_30F;
  const gpsInfo = {
    latitude: 1.0,
    longitude: 2.0,
    altitude: 3.0,
    dateTimeZone: '2022:01:01 00:01:00+09:00',
  };
  const gpsTagRecording = GpsTagRecordingEnum.ON;
  const iso = IsoEnum.ISO_100;
  const isoAutoHighLimit = IsoAutoHighLimitEnum.ISO_125;
  const maxRecordableTime = MaxRecordableTimeEnum.RECORDABLE_TIME_1500;
  const whiteBalance = WhiteBalanceEnum.AUTO;

  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildVideoCapture = jest.fn().mockImplementation(
    jest.fn(async (options: Options) => {
      expect(options.aperture).toBe(aperature);
      expect(options.colorTemperature).toBe(colorTemperature);
      expect(options.exposureCompensation).toBe(exposureCompensation);
      expect(options.exposureDelay).toBe(exposureDelay);
      expect(options.exposureProgram).toBe(exposureProgram);
      expect(options.fileFormat).toBe(fileFormat);
      expect(options.gpsInfo).toStrictEqual(gpsInfo);
      expect(options._gpsTagRecording).toBe(gpsTagRecording);
      expect(options.iso).toBe(iso);
      expect(options.isoAutoHighLimit).toBe(isoAutoHighLimit);
      expect(options.maxRecordableTime).toBe(maxRecordableTime);
      expect(options.whiteBalance).toBe(whiteBalance);
      return true;
    })
  );

  const res = await getVideoCaptureBuilder()
    .setAperture(aperature)
    .setColorTemperature(colorTemperature)
    .setExposureCompensation(exposureCompensation)
    .setExposureDelay(exposureDelay)
    .setExposureProgram(exposureProgram)
    .setFileFormat(fileFormat)
    .setGpsInfo(gpsInfo)
    .setGpsTagRecording(gpsTagRecording)
    .setIso(iso)
    .setIsoAutoHighLimit(isoAutoHighLimit)
    .setMaxRecordableTime(maxRecordableTime)
    .setWhiteBalance(whiteBalance)
    .build();
  expect(thetaClient.buildVideoCapture).toBeCalled();
  expect(res).toBeInstanceOf(VideoCapture);
});

test('Exception for call buildVideoCapture', async () => {
  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildVideoCapture = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );

  try {
    await getVideoCaptureBuilder().build();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getVideoCaptureBuilder).toBeCalled();
});

test('Call startCapture normal', async () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.MP4';
  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildVideoCapture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  thetaClient.startCapture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return fileUrl;
    })
  );

  const res = await (await getVideoCaptureBuilder().build()).startCapture();
  expect(thetaClient.startCapture).toBeCalled();
  expect(res).toBe(fileUrl);
});

test('Exception for call startCapture', async () => {
  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildVideoCapture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  thetaClient.startCapture = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );

  try {
    await (await getVideoCaptureBuilder().build()).startCapture();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.startCapture).toBeCalled();
});

test('Call stopCapture normal', async () => {
  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildVideoCapture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  thetaClient.stopCapture = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  (await getVideoCaptureBuilder().build()).stopCapture();
  expect(thetaClient.stopCapture).toBeCalled();
});

test('Exception for call stopCapture', async () => {
  thetaClient.getVideoCaptureBuilder = jest.fn().mockImplementation(
    jest.fn(() => {
      return;
    })
  );

  thetaClient.buildVideoCapture = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  thetaClient.stopCapture = jest.fn().mockImplementation(
    jest.fn(() => {
      throw 'error';
    })
  );

  try {
    (await getVideoCaptureBuilder().build()).stopCapture();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.stopCapture).toBeCalled();
});

test('Call finishWlan normal', async () => {
  thetaClient.finishWlan = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await finishWlan();
  expect(thetaClient.finishWlan).toBeCalled();
  expect(res).toBe(true);
});

test('Exception for call finishWlan', async () => {
  thetaClient.finishWlan = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await finishWlan();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.finishWlan).toBeCalled();
});

test('Call getMetadata normal', async () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG';
  const exifVersion = '0231';
  const dateTime = '2015:07:10 11:05:18';
  const imageWidth = 6720;
  const imageLength = 3360;
  const gpsLatitude = 35.68;
  const gpsLongitude = 139.76;
  const poseHeadingDegrees = 11.11;
  const fullPanoWidthPixels = 6720;
  const fullPanoHeightPixels = 3360;
  thetaClient.getMetadata = jest.fn().mockImplementation(
    jest.fn(async () => {
      const metadata: MetaInfo = {
        exif: {
          exifVersion,
          dateTime,
          imageWidth,
          imageLength,
          gpsLatitude,
          gpsLongitude,
        },
        xmp: {
          poseHeadingDegrees,
          fullPanoWidthPixels,
          fullPanoHeightPixels,
        },
      };
      return metadata;
    })
  );

  const res = await getMetadata(fileUrl);
  expect(thetaClient.getMetadata).toHaveBeenCalledWith(fileUrl);
  expect(res.exif?.exifVersion).toBe(exifVersion);
  expect(res.exif?.dateTime).toBe(dateTime);
  expect(res.exif?.imageWidth).toBe(imageWidth);
  expect(res.exif?.imageLength).toBe(imageLength);
  expect(res.exif?.gpsLatitude).toBe(gpsLatitude);
  expect(res.exif?.gpsLongitude).toBe(gpsLongitude);
  expect(res.xmp?.poseHeadingDegrees).toBe(poseHeadingDegrees);
  expect(res.xmp?.fullPanoWidthPixels).toBe(fullPanoWidthPixels);
  expect(res.xmp?.fullPanoHeightPixels).toBe(fullPanoHeightPixels);
});

test('Exception for call getMetadata', async () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG';
  thetaClient.getMetadata = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );
  try {
    await getMetadata(fileUrl);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.getMetadata).toHaveBeenCalledWith(fileUrl);
});

test('Call reset normal', async () => {
  thetaClient.reset = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await reset();
  expect(thetaClient.reset).toBeCalled();
  expect(res).toBe(true);
});

test('Exception for call reset', async () => {
  thetaClient.reset = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );
  try {
    await reset();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.reset).toBeCalled();
});

test('Call stopSelfTimer normal', async () => {
  thetaClient.stopSelfTimer = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await stopSelfTimer();
  expect(thetaClient.stopSelfTimer).toBeCalled();
  expect(res).toBe(true);
});

test('Exception for call stopSelfTimer', async () => {
  thetaClient.stopSelfTimer = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );
  try {
    await stopSelfTimer();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.stopSelfTimer).toBeCalled();
});

test('Call convertVideoFormats normal', async () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.MP4';
  const toLowResolution = true;
  const applyTopBottomCorrection = true;
  thetaClient.convertVideoFormats = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await convertVideoFormats(
    fileUrl,
    toLowResolution,
    applyTopBottomCorrection
  );
  expect(thetaClient.convertVideoFormats).toHaveBeenCalledWith(
    fileUrl,
    toLowResolution,
    applyTopBottomCorrection
  );
  expect(res).toBe(true);
});

test('Exception call for convertVideoFormats', async () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.MP4';
  const toLowResolution = true;
  const applyTopBottomCorrection = true;
  thetaClient.convertVideoFormats = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await convertVideoFormats(
      fileUrl,
      toLowResolution,
      applyTopBottomCorrection
    );
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.convertVideoFormats).toHaveBeenCalledWith(
    fileUrl,
    toLowResolution,
    applyTopBottomCorrection
  );
});

test('Call cancelVideoConvert normal', async () => {
  thetaClient.cancelVideoConvert = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await cancelVideoConvert();
  expect(thetaClient.cancelVideoConvert).toBeCalled();
  expect(res).toBe(true);
});

test('Exception for call cancelVideoConvert', async () => {
  thetaClient.cancelVideoConvert = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );
  try {
    await cancelVideoConvert();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.cancelVideoConvert).toBeCalled();
});

test('Call setBluetoothDevice normal', async () => {
  const uuid = '00000000-0000-0000-0000-000000000000';
  thetaClient.setBluetoothDevice = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await setBluetoothDevice(uuid);
  expect(thetaClient.setBluetoothDevice).toHaveBeenCalledWith(uuid);
  expect(res).toBe(true);
});

test('Exception call for setBluetoothDevice', async () => {
  const uuid = '00000000-0000-0000-0000-000000000000';
  thetaClient.setBluetoothDevice = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await setBluetoothDevice(uuid);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.setBluetoothDevice).toHaveBeenCalledWith(uuid);
});

test('Call listAccessPOints normal', async () => {
  const ssid = 'Test-Access-Point';
  const ssidStealth = true;
  const authMode = AuthModeEnum.WEP;
  const connectionPriority = 1;
  const usingDhcp = false;
  const ipAddress = '192.168.1.254';
  const subnetMask = '255.255.255.0';
  const defaultGateway = '192.168.1.1';

  thetaClient.listAccessPoints = jest.fn().mockImplementation(
    jest.fn(async () => {
      return [
        {
          ssid,
          ssidStealth,
          authMode,
          connectionPriority,
          usingDhcp,
          ipAddress,
          subnetMask,
          defaultGateway,
        },
      ];
    })
  );

  const res = await listAccessPoints();
  expect(thetaClient.listAccessPoints).toBeCalled();
  expect(res?.[0]?.ssid).toBe(ssid);
  expect(res?.[0]?.ssidStealth).toBe(ssidStealth);
  expect(res?.[0]?.authMode).toBe(authMode);
  expect(res?.[0]?.connectionPriority).toBe(connectionPriority);
  expect(res?.[0]?.usingDhcp).toBe(usingDhcp);
  expect(res?.[0]?.ipAddress).toBe(ipAddress);
  expect(res?.[0]?.subnetMask).toBe(subnetMask);
  expect(res?.[0]?.defaultGateway).toBe(defaultGateway);
});

test('Exception for call listAccessPoints', async () => {
  thetaClient.listAccessPoints = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );
  try {
    await listAccessPoints();
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.listAccessPoints).toBeCalled();
});

test('Call setAccessPointDynamically normal', async () => {
  const ssid = 'Test-Access-Point';
  const ssidStealth = true;
  const authMode = AuthModeEnum.WEP;
  const password = 'password';
  const connectionPriority = 1;
  thetaClient.setAccessPointDynamically = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await setAccessPointDynamically(
    ssid,
    ssidStealth,
    authMode,
    password,
    connectionPriority
  );
  expect(thetaClient.setAccessPointDynamically).toHaveBeenCalledWith(
    ssid,
    ssidStealth,
    authMode,
    password,
    connectionPriority
  );
  expect(res).toBe(true);
});

test('Exception for call setAccessPointDynamically', async () => {
  const ssid = 'Test-Access-Point';
  const ssidStealth = true;
  const authMode = AuthModeEnum.WEP;
  const password = 'password';
  const connectionPriority = 1;
  thetaClient.setAccessPointDynamically = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await setAccessPointDynamically(
      ssid,
      ssidStealth,
      authMode,
      password,
      connectionPriority
    );
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.setAccessPointDynamically).toHaveBeenCalledWith(
    ssid,
    ssidStealth,
    authMode,
    password,
    connectionPriority
  );
});

test('Call setAccessPointStatically normal', async () => {
  const ssid = 'Test-Access-Point';
  const ssidStealth = true;
  const authMode = AuthModeEnum.WEP;
  const password = 'password';
  const connectionPriority = 1;
  const ipAddress = '192.168.1.254';
  const subnetMask = '255.255.255.0';
  const defaultGateway = '192.168.1.1';
  thetaClient.setAccessPointStatically = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await setAccessPointStatically(
    ssid,
    ssidStealth,
    authMode,
    password,
    connectionPriority,
    ipAddress,
    subnetMask,
    defaultGateway
  );
  expect(thetaClient.setAccessPointStatically).toHaveBeenCalledWith(
    ssid,
    ssidStealth,
    authMode,
    password,
    connectionPriority,
    ipAddress,
    subnetMask,
    defaultGateway
  );
  expect(res).toBe(true);
});

test('Exception call for setAccessPointStatically', async () => {
  const ssid = 'Test-Access-Point';
  const ssidStealth = true;
  const authMode = AuthModeEnum.WEP;
  const password = 'password';
  const connectionPriority = 1;
  const ipAddress = '192.168.1.254';
  const subnetMask = '255.255.255.0';
  const defaultGateway = '192.168.1.1';
  thetaClient.setAccessPointStatically = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await setAccessPointStatically(
      ssid,
      ssidStealth,
      authMode,
      password,
      connectionPriority,
      ipAddress,
      subnetMask,
      defaultGateway
    );
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.setAccessPointStatically).toHaveBeenCalledWith(
    ssid,
    ssidStealth,
    authMode,
    password,
    connectionPriority,
    ipAddress,
    subnetMask,
    defaultGateway
  );
});

test('Call deleteAccessPoint normal', async () => {
  const ssid = 'Test-Access-Point';
  thetaClient.deleteAccessPoint = jest.fn().mockImplementation(
    jest.fn(async () => {
      return true;
    })
  );

  const res = await deleteAccessPoint(ssid);
  expect(thetaClient.deleteAccessPoint).toHaveBeenCalledWith(ssid);
  expect(res).toBe(true);
});

test('Exception call for deleteAccessPoint', async () => {
  const ssid = 'Test-Access-Point';
  thetaClient.deleteAccessPoint = jest.fn().mockImplementation(
    jest.fn(async () => {
      throw 'error';
    })
  );

  try {
    await deleteAccessPoint(ssid);
    throw new Error('failed');
  } catch (error) {
    expect(error).toBe('error');
  }
  expect(thetaClient.deleteAccessPoint).toHaveBeenCalledWith(ssid);
});
