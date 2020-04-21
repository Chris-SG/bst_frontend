export const compareUTCDate = (t1, t2) => {
  if (t1.getUTCFullYear() < t2.getUTCFullYear()) {
    return -1;
  }
  if (t1.getUTCFullYear() > t2.getUTCFullYear()) {
    return 1;
  }
  if (t1.getUTCMonth() < t2.getUTCMonth()) {
    return -1;
  }
  if (t1.getUTCMonth() > t2.getUTCMonth()) {
    return 1;
  }
  if (t1.getUTCDate() < t2.getUTCDate()) {
    return -1;
  }
  if (t1.getUTCDate() > t2.getUTCDate()) {
    return 1;
  }
  return 0;
};
