export function uid(length = 11) {
  return Math.random()
    .toString(36)
    .substr(2, length);
}
