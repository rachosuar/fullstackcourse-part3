import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const newPerson = (person) => {
  const request = axios.post(baseUrl, person);
  return request
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return;
};
const changePhone = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export default { getAll, newPerson, remove, changePhone };
