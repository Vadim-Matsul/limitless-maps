export { };

export const config = {
  dismissClassButton: 'dismissButton',
  sww: 'Something went wrong',
  mapInitProcess: 'initialization process',
  staticIconPath: '/devvela.svg',
  modal: {
    placeholder: 'Enter the title',
    successText: 'OK',
    rejectText: 'CANCEL',
  },
  vanillaMarkerTitle: 'I am a marker!',
  vanillaLabelTitle: 'I am a label!',
  list: {
    label: {
      nothing: 'Select a marker to see the labels',
      empty: 'You don`t have any labels yet'
    },
    marks: {
      empty: 'You don`t have any markers yet'
    }
  }
};

export const mapOptions: google.maps.MapOptions = {
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  scrollwheel: false,
  zoomControl: true,
};

export const mapInitialData = {
  style: {
    width: '100%',
    height: '100%'
  },
  center: {
    lat: 55.75400661415227,
    lng: 37.61661170356091
  },
};

