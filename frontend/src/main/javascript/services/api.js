import axios from 'axios';

const instance = axios.create({
    baseURL: '/api/v1'
});

/* const buildSearchMethod = (endpoint, method) => {
  const url = `${endpoint}/search/${method}`;

  return (params) => {
      return instance.get(url, { params })
  }
}; */

/* export function getEmployees() {
  return instance.get('/employee')
} */

/* export function getEmployee(id) {
    return instance.get(`/employee/${id}`)
} */

// export const getEmployeeByLastName = (name) => buildSearchMethod('/employee', 'findByLastName')({ name });

/* componentDidMount() {
    getEmployeeByLastName('Weber')
        .then((data) => {
            console.log(data)
        })
} */

export default instance;