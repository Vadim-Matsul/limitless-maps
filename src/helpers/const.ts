export { };

export const config = {
  dismissClassButton: 'dismissButton',
  sww: 'Something went wrong',
  mapInitProcess: 'initialization process',
  staticIconPath: '/devvela.svg',
  modal: {
    placeholder: 'Enter the marker title',
    successText: 'OK',
    rejectText: 'CANCEL',
  },
  vanillaTitle: 'I am a marker!'
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

