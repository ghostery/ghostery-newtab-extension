function getEndpoint() {
  if (localStorage.staging) {
    return "https://api.staging.ghosteryhighlights.com";
  }
  return "https://api.ghosteryhighlights.com";
}

export async function loadPrivateSponsoredLinks() {
  const response = await fetch(`${getEndpoint()}/v1/tiles`, { cache: 'no-cache' });
  const links = await response.json();

  return links.map(link => ({
    url: link.advertiserUrl,
    clickUrl: link.clickUrl,
    favicon: link.imageUrl,
    title: link.name,
  }));
}