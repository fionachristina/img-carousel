// imageUtils.js
export async function fetchImageUrls() {
  const response = await fetch('https://www.reddit.com/r/aww/top/.json?t=all');
  const data = await response.json();
  return data.data.children
  .filter(child => child.data.url_overridden_by_dest.endsWith('.jpg'))
  .map(child => child.data.url_overridden_by_dest);
}