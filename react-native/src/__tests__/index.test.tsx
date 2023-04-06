import { NativeModules } from 'react-native';
import * as ThetaClient from '..';

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

const thetaClientNative = NativeModules.ThetaClientReactNative;

describe('initialize', () => {
  const endpoint = 'http://192.168.1.1:80';
  test('Call initialize normal', async () => {
    thetaClientNative.initialize = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.initialize(endpoint);
    expect(thetaClientNative.initialize).toHaveBeenCalledWith(endpoint);
    expect(res).toBe(true);
  });

  test('Exception for call initialize', async () => {
    thetaClientNative.initialize = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.initialize(endpoint);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.initialize).toHaveBeenCalledWith(endpoint);
  });
});

describe('getThetaInfo', () => {
  it.todo('write getThetaInfo test for THETA X, V, SC, S.');

  test('Call getThetaInfo normal for THETA Z1', async () => {
    const info = {
      manufacturer: 'RICOH',
      model: 'RICOH THETA Z1',
      serialNumber: '10100001',
      wlanMacAddress: '00:45:78:bc:45:67',
      bluetoothMacAddress: '00:45:de:78:3e:33',
      firmwareVersion: '2.20.3',
      supportUrl: 'https://theta360.com/en/support/',
      hasGps: false,
      hasGyro: true,
      uptime: 67,
      api: [
        '/osc/info',
        '/osc/state',
        '/osc/checkForUpdates',
        '/osc/commands/execute',
        '/osc/commands/status',
      ],
      endpoints: {
        httpPort: 80,
        httpUpdatesPort: 80,
      },
      apiLevel: [1, 2],
    };
    thetaClientNative.getThetaInfo = jest.fn().mockResolvedValue(info);

    const res = await ThetaClient.getThetaInfo();
    expect(thetaClientNative.getThetaInfo).toBeCalled();
    expect(res.manufacturer).toBe(info.manufacturer);
    expect(res.model).toBe(info.model);
    expect(res.serialNumber).toBe(info.serialNumber);
    expect(res.wlanMacAddress).toBe(info.wlanMacAddress);
    expect(res.bluetoothMacAddress).toBe(info.bluetoothMacAddress);
    expect(res.firmwareVersion).toBe(info.firmwareVersion);
    expect(res.supportUrl).toBe(info.supportUrl);
    expect(res.hasGps).toBe(info.hasGps);
    expect(res.hasGyro).toBe(info.hasGyro);
    expect(res.uptime).toBe(info.uptime);
    expect(res.api).toStrictEqual(info.api);
    expect(res.endpoints).toStrictEqual(info.endpoints);
    expect(res.apiLevel).toStrictEqual(info.apiLevel);
  });

  test('Exception for call getThetaInfo', async () => {
    thetaClientNative.getThetaInfo = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.getThetaInfo();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getThetaInfo).toBeCalled();
  });
});

describe('getThetaState', () => {
  it.todo('write getThetaState test for THETA X, V, SC, S.');

  test('Call getThetaState normal for THETA Z1', async () => {
    const state = {
      fingerprint: 'FIG_0001',
      batteryLevel: 0.81,
      storageUri: 'http://192.168.1.1/files/150100525831424d42075b53ce68c300/',
      storageID: null,
      captureStatus: ThetaClient.CaptureStatusEnum.IDLE,
      recordedTime: 0,
      recordableTime: 0,
      capturedPictures: 0,
      compositeShootingElapsedTime: 0,
      latestFileUrl:
        'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R0010010.JPG',
      chargingState: ThetaClient.ChargingStateEnum.NOT_CHARGING,
      apiVersion: 2,
      isPluginRunning: false,
      isPluginWebServer: true,
      function: ThetaClient.ShootingFunctionEnum.SELF_TIMER,
      isMySettingChanged: false,
      currentMicrophone: null,
      isSdCard: false,
      cameraError: [ThetaClient.CameraErrorEnum.COMPASS_CALIBRATION],
      isBatteryInsert: null,
    };
    thetaClientNative.getThetaState = jest.fn().mockResolvedValue(state);

    const res = await ThetaClient.getThetaState();
    expect(thetaClientNative.getThetaState).toBeCalled();
    expect(res.fingerprint).toBe(state.fingerprint);
    expect(res.batteryLevel).toBe(state.batteryLevel);
    expect(res.storageUri).toBe(state.storageUri);
    expect(res.storageID).toBe(state.storageID);
    expect(res.captureStatus).toBe(state.captureStatus);
    expect(res.recordedTime).toBe(state.recordableTime);
    expect(res.recordableTime).toBe(state.recordableTime);
    expect(res.capturedPictures).toBe(state.capturedPictures);
    expect(res.compositeShootingElapsedTime).toBe(
      state.compositeShootingElapsedTime
    );
    expect(res.latestFileUrl).toBe(state.latestFileUrl);
    expect(res.chargingState).toBe(state.chargingState);
    expect(res.apiVersion).toBe(state.apiVersion);
    expect(res.isPluginRunning).toBe(state.isPluginRunning);
    expect(res.isPluginWebServer).toBe(state.isPluginWebServer);
    expect(res.function).toBe(state.function);
    expect(res.isMySettingChanged).toBe(state.isMySettingChanged);
    expect(res.currentMicrophone).toBe(state.currentMicrophone);
    expect(res.isSdCard).toBe(state.isSdCard);
    expect(res.cameraError).toStrictEqual(state.cameraError);
    expect(res.isBatteryInsert).toBe(state.isBatteryInsert);
  });

  test('Exception for call getThetaState', async () => {
    thetaClientNative.getThetaState = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.getThetaState();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getThetaState).toBeCalled();
  });
});

describe('listFiles', () => {
  const fileTypeEnum = ThetaClient.FileTypeEnum.IMAGE;
  const startPosition = 10;
  const entryCount = 10;

  test('Call listFiles normal', async () => {
    const files = {
      fileList: [
        {
          name: 'R00100010.JPG',
          size: 4051440,
          dateTime: '2015:07:10 11:05:18',
          thumbnailUrl:
            'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG?type=thumb',
          fileUrl:
            'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG',
        },
      ],
      totalEntries: 10,
    };
    thetaClientNative.listFiles = jest.fn().mockResolvedValue(files);

    const res = await ThetaClient.listFiles(
      fileTypeEnum,
      startPosition,
      entryCount
    );
    expect(thetaClientNative.listFiles).toHaveBeenCalledWith(
      fileTypeEnum,
      startPosition,
      entryCount
    );
    expect(res.fileList[0]!.name).toBe(files.fileList[0]!.name);
    expect(res.fileList[0]!.size).toBe(files.fileList[0]!.size);
    expect(res.fileList[0]!.dateTime).toBe(files.fileList[0]!.dateTime);
    expect(res.fileList[0]!.thumbnailUrl).toBe(files.fileList[0]!.thumbnailUrl);
    expect(res.fileList[0]!.fileUrl).toBe(files.fileList[0]!.fileUrl);
    expect(res.totalEntries).toBe(files.totalEntries);
  });

  test('Exception for call listFiles', async () => {
    thetaClientNative.listFiles = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.listFiles(fileTypeEnum, startPosition, entryCount);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.listFiles).toHaveBeenCalledWith(
      fileTypeEnum,
      startPosition,
      entryCount
    );
  });
});

describe('deleteFiles', () => {
  const fileUrls = [
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG',
  ];

  test('Call deleteFiles normal', async () => {
    thetaClientNative.deleteFiles = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.deleteFiles(fileUrls);
    expect(thetaClientNative.deleteFiles).toHaveBeenCalledWith(fileUrls);
    expect(res).toBe(true);
  });

  test('Exception for call deleteFiles', async () => {
    thetaClientNative.deleteFiles = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.deleteFiles(fileUrls);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.deleteFiles).toHaveBeenCalledWith(fileUrls);
  });
});

describe('deleteAllFiles', () => {
  test('Call deleteAllFiles normal', async () => {
    thetaClientNative.deleteAllFiles = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.deleteAllFiles();
    expect(thetaClientNative.deleteAllFiles).toBeCalled();
    expect(res).toBe(true);
  });

  test('Exception for call deleteAllFiles', async () => {
    thetaClientNative.deleteAllFiles = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.deleteAllFiles();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.deleteAllFiles).toBeCalled();
  });
});

describe('deleteAllImageFiles', () => {
  test('Call deleteAllImageFiles normal', async () => {
    thetaClientNative.deleteAllImageFiles = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.deleteAllImageFiles();
    expect(thetaClientNative.deleteAllImageFiles).toBeCalled();
    expect(res).toBe(true);
  });

  test('Exception for call deleteAllImageFiles', async () => {
    thetaClientNative.deleteAllImageFiles = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.deleteAllImageFiles();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.deleteAllImageFiles).toBeCalled();
  });
});

describe('deleteAllVideoFiles', () => {
  test('Call deleteAllVideoFiles normal', async () => {
    thetaClientNative.deleteAllVideoFiles = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.deleteAllVideoFiles();
    expect(thetaClientNative.deleteAllVideoFiles).toBeCalled();
    expect(res).toBe(true);
  });

  test('Exception for call deleteAllVideoFiles', async () => {
    thetaClientNative.deleteAllVideoFiles = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.deleteAllVideoFiles();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.deleteAllVideoFiles).toBeCalled();
  });
});

describe('getOptions', () => {
  const optionsName = [
    ThetaClient.OptionNameEnum.CaptureMode,
    ThetaClient.OptionNameEnum.GpsInfo,
  ];

  test('Call getOptions normal', async () => {
    const options: ThetaClient.Options = {
      aperture: ThetaClient.ApertureEnum.APERTURE_2_0,
      captureMode: ThetaClient.CaptureModeEnum.IMAGE,
    };
    thetaClientNative.getOptions = jest.fn().mockResolvedValue(options);

    const res = await ThetaClient.getOptions(optionsName);
    expect(thetaClientNative.getOptions).toHaveBeenCalledWith(optionsName);
    expect(res).toStrictEqual(options);
  });

  test('Exception for call getOptions', async () => {
    thetaClientNative.getOptions = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.getOptions(optionsName);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getOptions).toHaveBeenCalledWith(optionsName);
  });
});

describe('setOptions', () => {
  const options: ThetaClient.Options = {
    aperture: ThetaClient.ApertureEnum.APERTURE_2_0,
    captureMode: ThetaClient.CaptureModeEnum.IMAGE,
  };

  test('Call setOptions normal', async () => {
    thetaClientNative.setOptions = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.setOptions(options);
    expect(thetaClientNative.setOptions).toHaveBeenCalledWith(options);
    expect(res).toBeTruthy();
  });

  test('Exception for call setOptions', async () => {
    thetaClientNative.setOptions = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.setOptions(options);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.setOptions).toHaveBeenCalledWith(options);
  });
});

describe('getLivePreview', () => {
  test('Call getLivePreview normal', async () => {
    thetaClientNative.getLivePreview = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.getLivePreview();
    expect(thetaClientNative.getLivePreview).toBeCalled();
    expect(res).toBeTruthy();
  });

  test('Exception for call getLivePreview', async () => {
    thetaClientNative.getLivePreview = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.getLivePreview();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getLivePreview).toBeCalled();
  });
});

describe('stopLivePreview', () => {
  test('Call stopLivePreview normal', () => {
    thetaClientNative.stopLivePreview = jest.fn(() => {
      return;
    });

    ThetaClient.stopLivePreview();
    expect(thetaClientNative.stopLivePreview).toBeCalled();
  });

  test('Exception for call stopLivePreview', () => {
    thetaClientNative.stopLivePreview = jest.fn(() => {
      throw 'error';
    });

    try {
      ThetaClient.stopLivePreview();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.stopLivePreview).toBeCalled();
  });
});

describe('getPhotoCaptureBuilder', () => {
  test('Call getPhotoCaptureBuilder normal', () => {
    thetaClientNative.getPhotoCaptureBuilder = jest.fn(() => {
      return;
    });

    const res = ThetaClient.getPhotoCaptureBuilder();
    expect(thetaClientNative.getPhotoCaptureBuilder).toBeCalled();
    expect(res).toBeInstanceOf(ThetaClient.PhotoCaptureBuilder);
  });

  test('Exception for call getPhotoCaptureBuilder', () => {
    thetaClientNative.getPhotoCaptureBuilder = jest.fn(() => {
      throw 'error';
    });

    try {
      ThetaClient.getPhotoCaptureBuilder();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getPhotoCaptureBuilder).toBeCalled();
  });
});

describe('buildPhotoCapture', () => {
  test('Call buildPhotoCapture normal', async () => {
    const aperature = ThetaClient.ApertureEnum.APERTURE_2_0;
    const colorTemperature = 2;
    const exposureCompensation = ThetaClient.ExposureCompensationEnum.M_0_3;
    const exposureDelay = ThetaClient.ExposureDelayEnum.DELAY_1;
    const exposureProgram = ThetaClient.ExposureProgramEnum.APERTURE_PRIORITY;
    const fileFormat = ThetaClient.PhotoFileFormatEnum.IMAGE_11K;
    const filter = ThetaClient.FilterEnum.HDR;
    const gpsInfo = {
      latitude: 1.0,
      longitude: 2.0,
      altitude: 3.0,
      dateTimeZone: '2022:01:01 00:01:00+09:00',
    };
    const gpsTagRecording = ThetaClient.GpsTagRecordingEnum.ON;
    const iso = ThetaClient.IsoEnum.ISO_100;
    const isoAutoHighLimit = ThetaClient.IsoAutoHighLimitEnum.ISO_125;
    const whiteBalance = ThetaClient.WhiteBalanceEnum.AUTO;
    thetaClientNative.getPhotoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildPhotoCapture = jest.fn(
      async (options: ThetaClient.Options) => {
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
      }
    );

    const res = await ThetaClient.getPhotoCaptureBuilder()
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
    expect(thetaClientNative.buildPhotoCapture).toBeCalled();
    expect(res).toBeInstanceOf(ThetaClient.PhotoCapture);
  });

  test('Exception for call buildPhotoCapture', async () => {
    thetaClientNative.getPhotoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildPhotoCapture = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.getPhotoCaptureBuilder().build();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getPhotoCaptureBuilder).toBeCalled();
  });
});

describe('takePicture', () => {
  test('Call takePicture normal', async () => {
    const fileUrl =
      'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG';
    thetaClientNative.getPhotoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildPhotoCapture = jest.fn().mockResolvedValue(true);
    thetaClientNative.takePicture = jest.fn().mockResolvedValue(fileUrl);

    const res = await (
      await ThetaClient.getPhotoCaptureBuilder().build()
    ).takePicture();
    expect(thetaClientNative.takePicture).toBeCalled();
    expect(res).toBe(fileUrl);
  });

  test('Exception for call takePicture normal', async () => {
    thetaClientNative.getPhotoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildPhotoCapture = jest.fn().mockResolvedValue(true);
    thetaClientNative.takePicture = jest.fn(async () => {
      throw 'error';
    });

    try {
      await (await ThetaClient.getPhotoCaptureBuilder().build()).takePicture();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.takePicture).toBeCalled();
  });
});

describe('getVideoCaptureBuilder', () => {
  test('Call getVideoCaptureBuilder normal', () => {
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      return;
    });

    const res = ThetaClient.getVideoCaptureBuilder();
    expect(thetaClientNative.getVideoCaptureBuilder).toBeCalled();
    expect(res).toBeInstanceOf(ThetaClient.VideoCaptureBuilder);
  });

  test('Exception for call getVideoCaptureBuilder', () => {
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      throw 'error';
    });

    try {
      ThetaClient.getVideoCaptureBuilder();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getVideoCaptureBuilder).toBeCalled();
  });
});

describe('buildVideoCapture', () => {
  test('Call buildVideoCapture normal', async () => {
    const aperature = ThetaClient.ApertureEnum.APERTURE_2_0;
    const colorTemperature = 2;
    const exposureCompensation = ThetaClient.ExposureCompensationEnum.M_0_3;
    const exposureDelay = ThetaClient.ExposureDelayEnum.DELAY_1;
    const exposureProgram = ThetaClient.ExposureProgramEnum.APERTURE_PRIORITY;
    const fileFormat = ThetaClient.VideoFileFormatEnum.VIDEO_2K_30F;
    const gpsInfo = {
      latitude: 1.0,
      longitude: 2.0,
      altitude: 3.0,
      dateTimeZone: '2022:01:01 00:01:00+09:00',
    };
    const gpsTagRecording = ThetaClient.GpsTagRecordingEnum.ON;
    const iso = ThetaClient.IsoEnum.ISO_100;
    const isoAutoHighLimit = ThetaClient.IsoAutoHighLimitEnum.ISO_125;
    const maxRecordableTime =
      ThetaClient.MaxRecordableTimeEnum.RECORDABLE_TIME_1500;
    const whiteBalance = ThetaClient.WhiteBalanceEnum.AUTO;
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildVideoCapture = jest.fn(
      async (options: ThetaClient.Options) => {
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
      }
    );

    const res = await ThetaClient.getVideoCaptureBuilder()
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
    expect(thetaClientNative.buildVideoCapture).toBeCalled();
    expect(res).toBeInstanceOf(ThetaClient.VideoCapture);
  });

  test('Exception for call buildVideoCapture', async () => {
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildVideoCapture = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.getVideoCaptureBuilder().build();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getVideoCaptureBuilder).toBeCalled();
  });
});

describe('startCapture', () => {
  test('Call startCapture normal', async () => {
    const fileUrl =
      'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.MP4';
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildVideoCapture = jest.fn().mockResolvedValue(true);
    thetaClientNative.startCapture = jest.fn().mockResolvedValue(fileUrl);

    const res = await (
      await ThetaClient.getVideoCaptureBuilder().build()
    ).startCapture();
    expect(thetaClientNative.startCapture).toBeCalled();
    expect(res).toBe(fileUrl);
  });

  test('Exception for call startCapture', async () => {
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildVideoCapture = jest.fn().mockResolvedValue(true);
    thetaClientNative.startCapture = jest.fn(async () => {
      throw 'error';
    });

    try {
      await (await ThetaClient.getVideoCaptureBuilder().build()).startCapture();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.startCapture).toBeCalled();
  });
});

describe('stopCapture', () => {
  test('Call stopCapture normal', async () => {
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildVideoCapture = jest.fn().mockResolvedValue(true);
    thetaClientNative.stopCapture = jest.fn(() => {
      return;
    });

    (await ThetaClient.getVideoCaptureBuilder().build()).stopCapture();
    expect(thetaClientNative.stopCapture).toBeCalled();
  });

  test('Exception for call stopCapture', async () => {
    thetaClientNative.getVideoCaptureBuilder = jest.fn(() => {
      return;
    });
    thetaClientNative.buildVideoCapture = jest.fn().mockResolvedValue(true);
    thetaClientNative.stopCapture = jest.fn(() => {
      throw 'error';
    });

    try {
      (await ThetaClient.getVideoCaptureBuilder().build()).stopCapture();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.stopCapture).toBeCalled();
  });
});

describe('finishWlan', () => {
  test('Call finishWlan normal', async () => {
    thetaClientNative.finishWlan = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.finishWlan();
    expect(thetaClientNative.finishWlan).toBeCalled();
    expect(res).toBe(true);
  });

  test('Exception for call finishWlan', async () => {
    thetaClientNative.finishWlan = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.finishWlan();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.finishWlan).toBeCalled();
  });
});

describe('getMetadata', () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.JPG';

  test('Call getMetadata normal', async () => {
    const metadata = {
      exif: {
        exifVersion: '0231',
        dateTime: '2015:07:10 11:05:18',
        imageWidth: 6720,
        imageLength: 3360,
        gpsLatitude: 35.68,
        gpsLongitude: 139.76,
      },
      xmp: {
        poseHeadingDegrees: 11.11,
        fullPanoWidthPixels: 6720,
        fullPanoHeightPixels: 3360,
      },
    };
    thetaClientNative.getMetadata = jest.fn().mockResolvedValue(metadata);

    const res = await ThetaClient.getMetadata(fileUrl);
    expect(thetaClientNative.getMetadata).toHaveBeenCalledWith(fileUrl);
    expect(res.exif!.exifVersion).toBe(metadata.exif.exifVersion);
    expect(res.exif!.dateTime).toBe(metadata.exif.dateTime);
    expect(res.exif!.imageWidth).toBe(metadata.exif.imageWidth);
    expect(res.exif!.imageLength).toBe(metadata.exif.imageLength);
    expect(res.exif!.gpsLatitude).toBe(metadata.exif.gpsLatitude);
    expect(res.exif!.gpsLongitude).toBe(metadata.exif.gpsLongitude);
    expect(res.xmp!.poseHeadingDegrees).toBe(metadata.xmp.poseHeadingDegrees);
    expect(res.xmp!.fullPanoWidthPixels).toBe(metadata.xmp.fullPanoWidthPixels);
    expect(res.xmp!.fullPanoHeightPixels).toBe(
      metadata.xmp.fullPanoHeightPixels
    );
  });

  test('Exception for call getMetadata', async () => {
    thetaClientNative.getMetadata = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.getMetadata(fileUrl);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.getMetadata).toHaveBeenCalledWith(fileUrl);
  });
});

describe('reset', () => {
  test('Call reset normal', async () => {
    thetaClientNative.reset = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.reset();
    expect(thetaClientNative.reset).toBeCalled();
    expect(res).toBe(true);
  });

  test('Exception for call reset', async () => {
    thetaClientNative.reset = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.reset();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.reset).toBeCalled();
  });
});

describe('stopSelfTimer', () => {
  test('Call stopSelfTimer normal', async () => {
    thetaClientNative.stopSelfTimer = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.stopSelfTimer();
    expect(thetaClientNative.stopSelfTimer).toBeCalled();
    expect(res).toBe(true);
  });

  test('Exception for call stopSelfTimer', async () => {
    thetaClientNative.stopSelfTimer = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.stopSelfTimer();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.stopSelfTimer).toBeCalled();
  });
});

describe('convertVideoFormats', () => {
  const fileUrl =
    'http://192.168.1.1/files/150100525831424d42075b53ce68c300/100RICOH/R00100010.MP4';
  const toLowResolution = true;
  const applyTopBottomCorrection = true;

  test('Call convertVideoFormats normal', async () => {
    thetaClientNative.convertVideoFormats = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.convertVideoFormats(
      fileUrl,
      toLowResolution,
      applyTopBottomCorrection
    );
    expect(thetaClientNative.convertVideoFormats).toHaveBeenCalledWith(
      fileUrl,
      toLowResolution,
      applyTopBottomCorrection
    );
    expect(res).toBe(true);
  });

  test('Exception call for convertVideoFormats', async () => {
    thetaClientNative.convertVideoFormats = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.convertVideoFormats(
        fileUrl,
        toLowResolution,
        applyTopBottomCorrection
      );
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.convertVideoFormats).toHaveBeenCalledWith(
      fileUrl,
      toLowResolution,
      applyTopBottomCorrection
    );
  });
});

describe('cancelVideoFormats', () => {
  test('Call cancelVideoConvert normal', async () => {
    thetaClientNative.cancelVideoConvert = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.cancelVideoConvert();
    expect(thetaClientNative.cancelVideoConvert).toBeCalled();
    expect(res).toBe(true);
  });

  test('Exception for call cancelVideoConvert', async () => {
    thetaClientNative.cancelVideoConvert = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.cancelVideoConvert();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.cancelVideoConvert).toBeCalled();
  });
});

describe('setBluetoothDevice', () => {
  const uuid = '00000000-0000-0000-0000-000000000000';

  test('Call setBluetoothDevice normal', async () => {
    thetaClientNative.setBluetoothDevice = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.setBluetoothDevice(uuid);
    expect(thetaClientNative.setBluetoothDevice).toHaveBeenCalledWith(uuid);
    expect(res).toBe(true);
  });

  test('Exception call for setBluetoothDevice', async () => {
    thetaClientNative.setBluetoothDevice = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.setBluetoothDevice(uuid);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.setBluetoothDevice).toHaveBeenCalledWith(uuid);
  });
});

describe('listAccessPoints', () => {
  test('Call listAccessPoints normal', async () => {
    const accessPoint = [
      {
        ssid: 'Test-Access-Point',
        ssidStealth: true,
        authMode: ThetaClient.AuthModeEnum.WEP,
        connectionPriority: 1,
        usingDhcp: false,
        ipAddress: '192.168.1.254',
        subnetMask: '255.255.255.0',
        defaultGateway: '192.168.1.1',
      },
    ];
    thetaClientNative.listAccessPoints = jest
      .fn()
      .mockResolvedValue(accessPoint);

    const res = await ThetaClient.listAccessPoints();
    expect(thetaClientNative.listAccessPoints).toBeCalled();
    expect(res[0]!.ssid).toBe(accessPoint[0]!.ssid);
    expect(res[0]!.ssidStealth).toBe(accessPoint[0]!.ssidStealth);
    expect(res[0]!.authMode).toBe(accessPoint[0]!.authMode);
    expect(res[0]!.connectionPriority).toBe(accessPoint[0]!.connectionPriority);
    expect(res[0]!.usingDhcp).toBe(accessPoint[0]!.usingDhcp);
    expect(res[0]!.ipAddress).toBe(accessPoint[0]!.ipAddress);
    expect(res[0]!.subnetMask).toBe(accessPoint[0]!.subnetMask);
    expect(res[0]!.defaultGateway).toBe(accessPoint[0]!.defaultGateway);
  });

  test('Exception for call listAccessPoints', async () => {
    thetaClientNative.listAccessPoints = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.listAccessPoints();
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.listAccessPoints).toBeCalled();
  });
});

describe('setAccessPointDynamically', () => {
  const ssid = 'Test-Access-Point';
  const ssidStealth = true;
  const authMode = ThetaClient.AuthModeEnum.WEP;
  const password = 'password';
  const connectionPriority = 1;

  test('Call setAccessPointDynamically normal', async () => {
    thetaClientNative.setAccessPointDynamically = jest
      .fn()
      .mockResolvedValue(true);

    const res = await ThetaClient.setAccessPointDynamically(
      ssid,
      ssidStealth,
      authMode,
      password,
      connectionPriority
    );
    expect(thetaClientNative.setAccessPointDynamically).toHaveBeenCalledWith(
      ssid,
      ssidStealth,
      authMode,
      password,
      connectionPriority
    );
    expect(res).toBe(true);
  });

  test('Exception for call setAccessPointDynamically', async () => {
    thetaClientNative.setAccessPointDynamically = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.setAccessPointDynamically(
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
    expect(thetaClientNative.setAccessPointDynamically).toHaveBeenCalledWith(
      ssid,
      ssidStealth,
      authMode,
      password,
      connectionPriority
    );
  });
});

describe('setAccessPointStatically', () => {
  const ssid = 'Test-Access-Point';
  const ssidStealth = true;
  const authMode = ThetaClient.AuthModeEnum.WEP;
  const password = 'password';
  const connectionPriority = 1;
  const ipAddress = '192.168.1.254';
  const subnetMask = '255.255.255.0';
  const defaultGateway = '192.168.1.1';

  test('Call setAccessPointStatically normal', async () => {
    thetaClientNative.setAccessPointStatically = jest
      .fn()
      .mockResolvedValue(true);

    const res = await ThetaClient.setAccessPointStatically(
      ssid,
      ssidStealth,
      authMode,
      password,
      connectionPriority,
      ipAddress,
      subnetMask,
      defaultGateway
    );
    expect(thetaClientNative.setAccessPointStatically).toHaveBeenCalledWith(
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
    thetaClientNative.setAccessPointStatically = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.setAccessPointStatically(
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
    expect(thetaClientNative.setAccessPointStatically).toHaveBeenCalledWith(
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
});

describe('deleteAccessPoint', () => {
  const ssid = 'Test-Access-Point';

  test('Call deleteAccessPoint normal', async () => {
    thetaClientNative.deleteAccessPoint = jest.fn().mockResolvedValue(true);

    const res = await ThetaClient.deleteAccessPoint(ssid);
    expect(thetaClientNative.deleteAccessPoint).toHaveBeenCalledWith(ssid);
    expect(res).toBe(true);
  });

  test('Exception call for deleteAccessPoint', async () => {
    thetaClientNative.deleteAccessPoint = jest.fn(async () => {
      throw 'error';
    });

    try {
      await ThetaClient.deleteAccessPoint(ssid);
      throw new Error('failed');
    } catch (error) {
      expect(error).toBe('error');
    }
    expect(thetaClientNative.deleteAccessPoint).toHaveBeenCalledWith(ssid);
  });
});
