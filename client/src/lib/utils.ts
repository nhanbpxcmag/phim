export function IsClient(window: any) {
  return typeof window !== "undefined";
}
export function IsIphone(window: any) {
  const is_client = IsClient(window);
  return is_client && /(iPhone|iPod)/gi.test(window.navigator?.platform);
}
export function IsAndroid(window: any) {
  const UA = IsClient(window) ? window.navigator?.userAgent.toLowerCase() : "";
  return /android/.test(UA);
}

export function IsMobile(window: any) {
  return IsClient(window) && (IsAndroid(window) || IsIphone(window));
}
