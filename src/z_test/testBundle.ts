import { render, screen, fireEvent } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { createLabel, createMarker, createMarkers, createLocation, createInitMarkerData } from './testData';
import MarkerData from '../helpers/storage/sessionStorage';

const testBundle = {
  render,
  screen,
  fireEvent,
  UserEvent,
  MarkerData,
  creators: {
    createLabel,
    createMarker,
    createMarkers,
    createLocation,
    createInitMarkerData,
  }
};

export default testBundle;
