function parseTime(ms) {
  const s = Math.floor(ms / 1000);
  return {
    h: Math.floor(s / 3600),
    m: Math.floor(s / 60) % 60,
    s: s % 60,
  };
}

export function formatTime(ms) {
  if (!ms) { return `0 s`; }

  const time = parseTime(ms);
  let res = '';

  res = time.h > 0 ? `${time.h} h` : '';
  res += time.m > 0 ? ` ${time.m} m` : '';
  if (res === '') {
    res = `${time.s} s`;
  }
  return res.trim();
}
