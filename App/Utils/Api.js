const Api = {
  getBio(username) {
    console.log('hit here');
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}`;
    return fetch(url).then(res => console.log(res));
  },
  getRepos(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then(res => res.json());
  }
};

export default Api;