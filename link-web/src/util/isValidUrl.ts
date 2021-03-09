let r = new RegExp(
  "(((http|https)://)|)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
);

export default function isValidUrl(url: string) {
  return r.test(url);
}
