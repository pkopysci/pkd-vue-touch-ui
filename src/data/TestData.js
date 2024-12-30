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
  }
]

export const testAudioOutputs = [
  {
    Id: 'ao01',
    Label: 'Program Volume',
    Icon: 'volume',
    Zones: [],
    HasSync: false,
    MuteState: false,
    Level: 75,
    Tags: ['pgm', 'output'],
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
