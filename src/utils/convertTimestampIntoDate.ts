export default function convertTimestampIntoDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}
