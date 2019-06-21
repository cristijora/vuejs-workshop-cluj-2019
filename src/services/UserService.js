export default {
  getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())

  }
}
