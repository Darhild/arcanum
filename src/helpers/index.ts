export function prepareQuery (str: string) {
  return str.trim().toLowerCase().replace(" ", "-");
}