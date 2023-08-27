//author of handlebars helpers: Kieron Garvey
export const handlebarsHelpers = {
  // equal to
  eq: function (a, b) {
    return a === b;
  },
  // greater than
  gt: function (a, b) {
    return a > b;
  },
  // greater than or equal to
  gte: function (a, b) {
    return a >= b;
  },
  // less than
  lt: function (a, b) {
    return a < b;
  },
  // less than or equal to
  lte: function (a, b) {
    return a <= b;
  },
  // not equal to
  ne: function (a, b) {
    return a !== b;
  },
  // If Null
  ifNotNull: function (a) {
    if (a !== null) {
      return 1;
    } else {
      return 0;
    }
  },
  // If Station
  ifStation: function (a) {
    if (a === "Station") {
      return 1;
    } else {
      return 0;
    }
  },
  // testing
  test: function (a, b) {
    if (a >= b) {
      return "Test";
    } else {
      return "Fail";
    }
  },
};
