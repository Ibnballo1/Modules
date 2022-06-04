/* eslint-disable linebreak-style */
import { DateTime } from 'luxon';
import { date } from './variables.js';

const now = DateTime.now();
date.textContent = now.toLocaleString(DateTime.DATETIME_MED);