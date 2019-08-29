const request = require("request-promise-native");

const fetchMyIP = () => {
  const url = "https://api.ipify.org/?format=json";
  return request(url);
};

const fetchCoordsByIP = body => {
  const ip = JSON.parse(body).ip;
  const url = "https://ipvigilante.com/" + ip;
  return request(url);
};

const fetchISSFlyOverTimes = body => {
  const lat = JSON.parse(body).data.latitude;
  const lon = JSON.parse(body).data.longitude;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
