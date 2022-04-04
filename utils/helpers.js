module.exports = {
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return `${word}`;
  },
  format_post: (text) => {
    if (text.length > 150) {
      return text.substring(0, 150) + "...";
    }
    return text;
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
};
