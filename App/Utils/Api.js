import Realm from 'realm';

/////////////
// SCHEMAS
/////////////
class Note {
  static get () { return realm.objects(Note.schema.name) }
  static schema = {
    name: 'Note',
    properties: {
      username: 'string',
      key: 'string'
    }
  }
}

const realm = new Realm({schema: [Note.schema]});

/////////////
// API
/////////////
const Api = {
  getBio(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}`;
    return fetch(url).then(res => res.json());
  },
  getRepos(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then(res => res.json());
  },
  getNotes(username) {
    username = username.toLowerCase().trim();
    return Note.get().filtered('username = "' + username + '"');
  },
  addNote(username, note) {
    username = username.toLowerCase().trim();

    realm.write(() => {
      realm.create(Note.schema.name, {
        username: username,
        key: note
      });
    });
  },
  getRealm() {
    return realm;
  }
};

export default Api;