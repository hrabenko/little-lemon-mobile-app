import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'create table if not exists menuitems (id integer primary key not null, uuid text, name text, price text, description text, image text, category text);'
                );
            },
            reject,
            resolve
        );
    });
}

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('select * from menuitems', [], (_, {rows}) => {
                resolve(rows._array);
            });
        });
    });
}

export function saveMenuItems(menuItems) {
    const insertQuery = `INSERT INTO menuitems (uuid, name, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)`;

    db.transaction((tx) => {
        menuItems.map((item) => {
            tx.executeSql(insertQuery, [item.uuid, item.name, item.price, item.description, item.image, item.category]);
        })
    });
}

export async function filterByQueryAndCategories(query, activeCategories) {
    const queryString = `%${query}%`;
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql(`select * from menuitems where name like ? and category in (${activeCategories.map((item) => `"${item}"`).join(", ")})`, [queryString], (_, {rows}) => {
                resolve(rows._array);
            });
        });
    });
}