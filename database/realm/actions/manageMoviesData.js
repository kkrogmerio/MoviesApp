import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("graduationProject.db");
// const Realm= new Realm(databaseOptions);
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS movies (title TEXT,overview TEXT,popularity REAL,adult TEXT,backdrop_path TEXT,poster_path TEXT,vote_average REAL,id INTEGER,release TEXT,vote_count INTEGER);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    })
  return promise;
});
}
export const getDataFromDb = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM movies",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const insertDataInDb = (data) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log(data[0])
      data.map(ie=>
tx.executeSql(
        `INSERT INTO movies(title,overview,popularity,adult,backdrop_path,poster_path,vote_average,id,release,vote_count) VALUES (?, ?, ?,?,?,?,?,?,?,?);`,
        [
          ie.title,
          ie.overview,
          ie.popularity,
          ie.adult,
          ie.backdrop_path,
          ie.poster_path,
          ie.vote_average,
          ie.id,
          ie.release,
          ie.vote_count,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      ));
    });
  });
  return promise;
};
// export const insertDataInDb = (data) => {
//   return new Promise((resolve, reject) => {
//     db.allDocs()
//       .then(function (result) {
//         return Promise.all(
//           result.rows.map(function (row) {
//             return db.remove(row.id, row.value.rev);
//           })
//         );
//       })
//       .then(function () {})
//       .catch(function (err) {});
//     data.map((ie) => {
//       db.put({
//         title: ie.title,
//         overview: ie.overview,
//         popularity: ie.popularity,
//         adult: ie.adult,
//         backdrop_path: ie.backdrop_path,
//         poster_path: ie.poster_path,
//         vote_average: ie.vote_average,
//         id: ie.id,
//         release: ie.release,
//         vote_count: ie.vote_count,
//         //   vote_average: ie.vote_average,
//       });
//     });
//     console.log(db.allDocs());
//     // Realm.open(databaseOptions).then((realm) => {
//     //   realm.write(() => {

//     //     let allData = realm.objects("Movie");
//     //     realm.delete(allData);

//     //     data.map((ie) =>
//     //       realm.create("Movie", {
//     //         title: ie.title,
//     //         overview: ie.overview,
//     //         popularity: ie.popularity,
//     //         adult: ie.adult,
//     //         backdrop_path: ie.backdrop_path,
//     //         poster_path: ie.poster_path,
//     //         vote_average: ie.vote_average,
//     //         id: ie.id,
//     //         release: ie.release,
//     //         vote_count: ie.vote_count,
//     //         //   vote_average: ie.vote_average,
//     //       })
//     //     );
//     //   });
//     // });
//   });
// };

// export default new Realm(databaseOptions);
