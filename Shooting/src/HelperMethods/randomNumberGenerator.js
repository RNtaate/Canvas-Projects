const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default randomNumberGenerator;
