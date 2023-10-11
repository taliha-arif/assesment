import Fuse from 'fuse.js';
export const debounce = (func: any) => {
  let timer: any;
  return function (...args: any) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 1000);
  };
};


export function fuzzySearch(term: string, universities: [], type: string) {
  const options = {
    keys: [type], // Specify the keys to search on
    threshold: 0.3, // Adjust the threshold based on your preference
  };

  const fuse = new Fuse(universities, options);
  const searchResults = fuse.search(term);
  return searchResults;
}
