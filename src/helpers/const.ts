const config = {
  mapInitProcess: 'initialization process',
  dismissClassButton: 'dismissButton',
  staticIconPath: '/devvela.svg',
  sww: 'Something went wrong',
  modal: {
    placeholder: 'Enter the title',
    rejectText: 'CANCEL',
    successText: 'OK',
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
  },
  errorText: 'Nasty crash...'
};

const mapOptions: google.maps.MapOptions = {
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  scrollwheel: false,
  zoomControl: true,
};

const mapInitialData = {
  center: {
    lat: 55.75400661415227,
    lng: 37.61661170356091,
  },
  style: {
    height: '100%',
    width: '100%',
  },
};


export default config;
export {
  mapInitialData,
  mapOptions
};
