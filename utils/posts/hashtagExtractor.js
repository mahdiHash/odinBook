function extractor(text = '') {
  let index = 0;
  let tags = [];

  while (true) {
    index = text.indexOf('#', index);

    if (index === -1) break;

    let tag = '';

    for (let i = index + 1; i < text.length; i++) {
      if (isValid(text[i])) { 
        tag += text[i];
      }
      else break;
    }

    tags.push(tag);
    index++;
  }

  // convert the array to a Set so the duplicate values are removed
  // and return an array again
  return [...new Set(tags)];
}

function isValid(char = '') {
  if (char === '_') {
    return true;
  }

  let charCode = char.charCodeAt(0);

  // a-zZ-a
  return charCode >= 97 && charCode <= 122 ||
    charCode >= 65 && charCode <= 90;
}

module.exports = extractor;
