export function toPrettyJson(o: unknown) {
  return JSON.stringify(o, null, 2)
}
