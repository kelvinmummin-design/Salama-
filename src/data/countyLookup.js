function insideRing(point, ring) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const crosses = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function insidePolygon(point, rings) {
  return rings.length > 0 && insideRing(point, rings[0]) && !rings.slice(1).some(ring => insideRing(point, ring));
}

export function findCounty(collection, latitude, longitude) {
  const point = [longitude, latitude];
  const feature = collection.features.find(item => {
    const geometry = item.geometry;
    if (geometry.type === 'Polygon') return insidePolygon(point, geometry.coordinates);
    if (geometry.type === 'MultiPolygon') return geometry.coordinates.some(polygon => insidePolygon(point, polygon));
    return false;
  });
  return feature?.properties?.shapeName || '';
}
