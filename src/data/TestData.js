export const testDisplays = [
  {
    Id: 'disp01',
    Label: 'Projector',
    Icon: 'projector',
    IsOnline: true,
    HasScreen: true,
    PowerState: true,
    Tags: '',
    Inputs: []
  },
  {
    Id: 'disp02',
    Label: 'Display 1',
    Icon: 'tv',
    IsOnline: true,
    HasScreen: false,
    PowerState: false,
    Tags: '',
    Inputs: []
  },
  {
    Id: 'disp03',
    Label: 'Display 2',
    Icon: 'tv',
    IsOnline: true,
    HasScreen: false,
    PowerState: true,
    Tags: '',
    Inputs: []
  }
]

export const testMenu = [
  {
    Id: 'MENUHOME',
    Visible: true,
    Label: 'Sources',
    Icon: 'routing',
    Control: 'av-routing',
    SourceSelect: '',
    Tags: []
  },
  {
    Id: 'MENU01',
    Visible: true,
    Label: 'Display Controls',
    Icon: 'projector',
    Control: 'displays',
    SourceSelect: '',
    Tags: []
  },
  {
    Id: 'MENU03',
    Visible: true,
    Label: 'Mics',
    Icon: 'mics',
    Control: 'mics',
    SourceSelect: '',
    Tags: []
  },
  {
    Id: 'MENU04',
    Visible: true,
    Label: 'Lighting',
    Icon: 'lights',
    Control: 'lighting',
    SourceSelect: '',
    Tags: []
  },
  {
    Id: 'MENU05',
    Visible: true,
    Label: 'Video',
    Icon: 'tv',
    Control: 'video-matrix',
    SourceSelect: '',
    Tags: []
  },
  {
    Id: 'MENU06',
    Visible: true,
    Label: 'Audio',
    Icon: 'note',
    Control: 'audio-matrix',
    SourceSelect: '',
    Tags: []
  },
  {
    Id: 'MENU07',
    Visible: true,
    Label: 'Video Wall',
    Icon: 'grid',
    Control: 'video-wall',
    SourceSelect: '',
    Tags: []
  },
  {
    Id: 'MENU08',
    Visible: true,
    Label: 'Cameras',
    Icon: 'camera',
    Control: 'cameras',
    SourceSelect: '',
    Tags: []
  }
]

export const testAudioOutputs = [
  {
    Id: 'ao01',
    Label: 'Program Volume',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: true,
    Level: 75,
    Tags: ['pgm','output'],
    RoutedInput: 'ai02'
  },
  {
    Id: 'ao02',
    Label: 'Zone 1',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: false,
    Level: 25,
    Tags: ['output'],
    RoutedInput: 'ai02'
  },
  {
    Id: 'ao03',
    Label: 'Zone 2',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: true,
    Level: 50,
    Tags: ['output'],
    RoutedInput: 'ai01'
  },
  {
    Id: 'ao04',
    Label: 'Zone 3',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: false,
    Level: 100,
    Tags: ['output'],
    RoutedInput: 'ai03'
  },
  {
    Id: 'ao05',
    Label: 'Zone 4',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: false,
    Level: 50,
    Tags: ['output'],
    RoutedInput: 'ai02'
  },
  {
    Id: 'ao06',
    Label: 'Zone 5',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: true,
    Level: 25,
    Tags: ['output'],
    RoutedInput: 'ai04'
  }
]

export const testAudioInputs = [
  {
    Id: 'ai01',
    Label: 'PC',
    Icon: 'volume',
    Zones: [],
    HasSync: true,
    MuteState: false,
    Level: 0,
    Tags: ['input'],
    RoutedInput: ''
  },
  {
    Id: 'ai02',
    Label: 'Wallplate',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: false,
    Level: 0,
    Tags: ['input'],
    RoutedInput: ''
  },
  {
    Id: 'ai03',
    Label: 'Cable TV 1',
    Icon: 'volume',
    Zones: [],
    HasSync: true,
    MuteState: true,
    Level: 0,
    Tags: ['input'],
    RoutedInput: ''
  },
  {
    Id: 'ai04',
    Label: 'Cable TV 2',
    Icon: 'volume',
    Zones: [],
    HasSync: true,
    MuteState: false,
    Level: 0,
    Tags: ['input'],
    RoutedInput: ''
  }
]

export const testMics = [
  {
    Id: 'ch02',
    Label: 'Podium',
    Icon: '',
    Zones: [],
    HasSync: false,
    MuteState: true,
    Level: 75,
    Tags: ['microphone', 'input'],
    RoutedInput: ''
  },
  {
    Id: 'ch03',
    Label: 'Wireless 1',
    Icon: '',
    Zones: [],
    HasSync: false,
    MuteState: true,
    Level: 25,
    Tags: ['microphone', 'input'],
    RoutedInput: ''
  },
  {
    Id: 'ch04',
    Label: 'Wireless 2',
    Icon: '',
    Zones: [],
    HasSync: false,
    MuteState: false,
    Level: 25,
    Tags: ['microphone', 'input'],
    RoutedInput: ''
  }
]

export const testLightingZones = [
  {
    Id: 'light01',
    ControlId: 'ctrl01',
    Label: 'Zone 1',
    Load: 0,
    Tags: []
  },
  {
    Id: 'light02',
    ControlId: 'ctrl01',
    Label: 'Zone 2',
    Load: 25,
    Tags: []
  },
  {
    Id: 'light03',
    ControlId: 'ctrl01',
    Label: 'Zone 3',
    Load: 50,
    Tags: []
  },
  {
    Id: 'light04',
    ControlId: 'ctrl01',
    Label: 'Zone 4',
    Load: 75,
    Tags: []
  },
  {
    Id: 'light05',
    ControlId: 'ctrl01',
    Label: 'Zone 5',
    Load: 100,
    Tags: []
  },
  {
    Id: 'light06',
    ControlId: 'ctrl01',
    Label: 'Zone 6',
    Load: 0,
    Tags: []
  },
  {
    Id: 'light07',
    ControlId: 'ctrl01',
    Label: 'Zone 7',
    Load: 25,
    Tags: []
  },
  {
    Id: 'light08',
    ControlId: 'ctrl01',
    Label: 'Zone 8',
    Load: 50,
    Tags: []
  }
]

export const testLightingScenes = [
  {
    Id: 'scene01',
    ControlId: 'ctrl01',
    Label: 'Scene 1',
    Set: true,
    Tags: []
  },
  {
    Id: 'scene02',
    ControlId: 'ctrl01',
    Label: 'Scene 2',
    Set: false,
    Tags: []
  },
  {
    Id: 'scene03',
    ControlId: 'ctrl01',
    Label: 'Scene 3',
    Set: false,
    Tags: []
  },
  {
    Id: 'scene04',
    ControlId: 'ctrl01',
    Label: 'Scene 4',
    Set: false,
    Tags: []
  }
]

export const testVideoInputs = [
  {
    Id: 'vs01',
    Label: 'Video Source 1',
    Icon: 'computer',
    Control: '',
    HasSync: true,
    Tags: ''
  },
  {
    Id: 'vs02',
    Label: 'Video Source 2',
    Icon: 'vga',
    Control: '',
    HasSync: true,
    Tags: ''
  },
  {
    Id: 'vs03',
    Label: 'Video Source 3',
    Icon: 'laptop',
    Control: '',
    HasSync: true,
    Tags: ''
  },
  {
    Id: 'vs04',
    Label: 'Cable TV 1',
    Icon: 'cable-tv',
    Control: 'ctv01',
    HasSync: true,
    Tags: ''
  },
  {
    Id: 'vs05',
    Label: 'Cable TV 2',
    Icon: 'cable-tv',
    Control: 'ctv02',
    HasSync: true,
    Tags: ''
  },
  {
    Id: 'vs06',
    Label: 'Apple TV',
    Icon: 'apple-tv',
    Control: 'ctv03',
    HasSync: true,
    Tags: ''
  }
]

export const testVideDestinations = [
  {
    Id: 'vd01',
    Label: 'Destination 1',
    Icon: 'tv',
    CurrentSourceId: 'vs05',
    Tags: ''
  },
  {
    Id: 'vd02',
    Label: 'Destination 2',
    Icon: 'tv',
    CurrentSourceId: 'vs02',
    Tags: ''
  },
  {
    Id: 'vd03',
    Label: 'Destination 3',
    Icon: 'tv',
    CurrentSourceId: 'vs03',
    Tags: ''
  },
  {
    Id: 'vd04',
    Label: 'Destination 4',
    Icon: 'tv',
    CurrentSourceId: 'vs03',
    Tags: ''
  },
  {
    Id: 'vd05',
    Label: 'Destination 5',
    Icon: 'tv',
    CurrentSourceId: 'vs02',
    Tags: ''
  },
  {
    Id: 'vd06',
    Label: 'Destination 6',
    Icon: 'tv',
    CurrentSourceId: 'vs01',
    Tags: ''
  }
]

export const testTransportDevices = [
  {
    Id: 'ctv01',
    Label: 'Cable TV 1',
    Icon: 'cable-tv',
    Type: 'cable-tv',
    SupportsDiscretePower: true,
    SupportsColorButtons: true,
    SupportsVideoTransports: true,
    SupportsDvrTransports: true,
    Favorites: [
      { Id: 'favorite1', Label: 'Favorite 1' },
      { Id: 'favorite2', Label: 'Favorite 2' },
      { Id: 'favorite3', Label: 'Favorite 3' }
    ],
    Tags: []
  },
  {
    Id: 'ctv02',
    Label: 'Cable TV 2',
    Icon: 'cable-tv',
    Type: 'cable-tv',
    SupportsDiscretePower: false,
    SupportsColorButtons: true,
    SupportsVideoTransports: false,
    SupportsDvrTransports: false,
    Favorites: [
      { Id: 'favorite1', Label: 'Favorite 1' },
      { Id: 'favorite2', Label: 'Favorite 2' }
    ],
    Tags: []
  },
  {
    Id: 'ctv03',
    Label: 'Cable TV 3',
    Icon: 'cable-tv',
    Type: 'cable-tv',
    SupportsDiscretePower: true,
    SupportsColorButtons: false,
    SupportsVideoTransports: false,
    SupportsDvrTransports: false,
    Favorites: [
      { Id: 'favorite1', Label: 'Favorite 1' },
      { Id: 'favorite2', Label: 'Favorite 2' },
      { Id: 'favorite3', Label: 'Favorite 3' },
      { Id: 'favorite4', Label: 'Favorite 4' }
    ],
    Tags: []
  }
]

export const testVideoWallLayouts = [
  {
    Id: 'vw01',
    Label: '2x2 Grid',
    Width: 2,
    Height: 2,
    Cells: [
      { Id: 'vw01d01', XPosition: 1, YPosition: 1, SourceId: 'vs01' },
      { Id: 'vw01d02', XPosition: 2, YPosition: 1, SourceId: 'vs02' },
      { Id: 'vw01d03', XPosition: 1, YPosition: 2, SourceId: 'vs03' },
      { Id: 'vw01d04', XPosition: 2, YPosition: 2, SourceId: 'vs04' }
    ]
  },
  {
    Id: 'vw02',
    Label: '4x2 Grid',
    Width: 4,
    Height: 2,
    Cells: [
      { Id: 'vw02d01', XPosition: 1, YPosition: 1, SourceId: 'vs01' },
      { Id: 'vw02d02', XPosition: 2, YPosition: 1, SourceId: 'vs01' },
      { Id: 'vw02d03', XPosition: 3, YPosition: 1, SourceId: 'vs01' },
      { Id: 'vw02d04', XPosition: 4, YPosition: 1, SourceId: 'vs01' },
      { Id: 'vw02d05', XPosition: 1, YPosition: 2, SourceId: 'vs01' },
      { Id: 'vw02d06', XPosition: 2, YPosition: 2, SourceId: 'vs01' },
      { Id: 'vw02d07', XPosition: 3, YPosition: 2, SourceId: 'vs01' },
      { Id: 'vw02d08', XPosition: 4, YPosition: 2, SourceId: 'vs01' }
    ]
  },
  {
    Id: 'vw03',
    Label: 'Dual Video',
    Width: 2,
    Height: 1,
    Cells: [
      { Id: 'vw03d01', XPosition: 1, YPosition: 1, SourceId: 'vs01' },
      { Id: 'vw03d02', XPosition: 2, YPosition: 1, SourceId: 'vs01' }
    ]
  },
  {
    Id: 'vw04',
    Label: 'Full Screen',
    Width: 1,
    Height: 1,
    Cells: [{ Id: 'vw04d01', XPosition: 1, YPosition: 1, SourceId: 'vs01' }]
  },
]

export const testCameras = [
  {
    Id: 'cam01',
    Label: 'Camera 1',
    Icon: 'camera',
    Control: '',
    Manufacturer: 'Fake Camera',
    Model: 'Fakery',
    IsOnline: true,
    SupportsZoom: true,
    SupportsPanTilt: true,
    SupportsSavingPresets: true,
    Presets: [
      { Id: 'preset1', Label: 'Preset 1' },
      { Id: 'preset2', Label: 'Preset 2' },
      { Id: 'preset3', Label: 'Preset 3' },
      { Id: 'preset4', Label: 'Preset 4' }
    ],
    Tags: []
  }
]
