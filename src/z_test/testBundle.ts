import { render, screen, fireEvent } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import type { DataSlice, LogicSlice } from '../types/state-manager';

import { createLabel, createMarker, createLocation, createInitMarkerData, title, labelId, markerId } from './testData';
import { ACTIONS_CREATORS } from '../service/store/actions/actions';
import MarkerData from '../helpers/storage/sessionStorage';

const dataState: DataSlice = { markers: [createMarker()] };
const logicState: LogicSlice = {
  activeMarker: null,
  center: createLocation(),
  isReady: false,
};

const testBundle = {
  render,
  screen,
  fireEvent,
  UserEvent,
  MarkerData,
  state: {
    dataState,
    logicState,
    ACTIONS_CREATORS,
  },
  data: {
    title,
    labelId,
    markerId,
  },
  creators: {
    createLabel,
    createMarker,
    createLocation,
    createInitMarkerData,
  }
};

export default testBundle;
