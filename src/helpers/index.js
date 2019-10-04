export function prepareQuery (str) {
  return str.trim().toLowerCase().replace(" ", "-");
}