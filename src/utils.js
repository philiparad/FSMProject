export const getRandomCountries = (data, count) => {
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
