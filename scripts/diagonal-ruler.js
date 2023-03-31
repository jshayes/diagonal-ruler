import { MODULE_ID } from "./module.js";

export function registerDiagonalRuler() {
  libWrapper.register(MODULE_ID, "Ruler.prototype._computeDistance", computeDistance, libWrapper.MIXED);
}

function computeDistance(wrapper, gridSpaces) {
  const { size, distance } = canvas.scene.dimensions;
  let totalDistance = 0;
  let startWithDouble = false;

  for (const [index, segment] of this.segments.entries()) {
    const dx = Math.abs(segment.ray.dx) / size;
    const dy = Math.abs(segment.ray.dy) / size;

    let angles = dx;
    let remainder = dy - dx;
    if (dx > dy) {
      angles = dy;
      remainder = dx - dy;
    }

    const doubleAngles = startWithDouble ? Math.ceil(angles / 2) : Math.floor(angles / 2);
    const segmentDistance = (angles - doubleAngles) * distance + doubleAngles * 2 * distance + remainder * distance;
    totalDistance += segmentDistance;

    if (angles % 2 !== 0) {
      startWithDouble = !startWithDouble;
    }

    segment.last = index === (this.segments.length - 1);
    segment.distance = segmentDistance;
    segment.text = this._getSegmentLabel(segment, totalDistance);
  }
}