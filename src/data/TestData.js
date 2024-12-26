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
  }
]

export const testMics = [
  {
    Id: 'ch02',
    Label: 'Podium',
    Icon: '',
    Zones: [],
    HasSync: false,
    MuteState: false,
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
