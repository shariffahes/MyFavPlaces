import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places(id INTEGER PRIMARY KEY NOT NULL,title TEXT NOT NULL, imagePath TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL  );",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUrl, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO places(title,imagePath,address,lat,lng) VALUES(?,?,?,?,?);",
        [title, imageUrl, address, lat, lng],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM places;",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};
