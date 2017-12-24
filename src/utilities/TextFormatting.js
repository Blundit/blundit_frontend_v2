class TextFormatting {
  static sentenceCase (text) {
    return text.replace(/\w\S*/g, function(text) {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
  }
}

export default TextFormatting;