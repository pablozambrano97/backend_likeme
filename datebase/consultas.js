import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    allowExitOnIdle: true,
});

const allPosts = async () => {
    const { rows, rowCount, command } = await pool.query ("SELECT * FROM posts");
    return rows;
};

const addPost = async ({titulo, url, descripcion}) => {

    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *";
    const values = [titulo, url, descripcion, 0];
    const result = await pool.query(consulta, values);
    return result.rows[0] 
}

export {allPosts, addPost};