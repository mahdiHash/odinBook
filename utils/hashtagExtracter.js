function extracter(text = '') {
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

  return tags;
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

module.exports = extracter;
