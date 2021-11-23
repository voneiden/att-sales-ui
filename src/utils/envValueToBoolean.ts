export default function envValueToBoolean(value: string | undefined | boolean, defaultValue: boolean): boolean {
  const strValue = String(value).toLowerCase();
  if (value === false || strValue === '' || strValue === 'false' || strValue === '0') {
    return false;
  }
  if (value === true || strValue === 'true' || strValue === '1') {
    return true;
  }
  return defaultValue;
}
