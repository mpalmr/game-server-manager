import applyServerEvents from './server';
import applySshEvents from './ssh';

export default function applyEvents() {
  applyServerEvents();
  applySshEvents();
}
