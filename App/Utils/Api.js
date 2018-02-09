const Api = {
  getBio(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/user/${username}/repos`;
    return fetch(url).then(res => res.json());
  },
  getRepos(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/user/${username}/repos`;
    return fetch(url).then(res => res.json());
  }
};

export default Api;