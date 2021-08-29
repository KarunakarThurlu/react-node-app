
//fetch data from JSONplaceholder
const fetchData =() => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => data);
}