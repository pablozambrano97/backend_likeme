import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    allowExitOnIdle: true,
});

const allPosts = async () => {
    const { rows } = await pool.query ("SELECT * FROM posts ORDER BY id DESC");
    return rows;
};

const addPost = async ({titulo, url, descripcion}) => {

    //validamos error de ingreso de datos.
    if(!titulo || !url || !descripcion){
        throw {code: 400};
    }

    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *";
    const values = [titulo, url, descripcion, 0];
    const result = await pool.query(consulta, values);
    console.log(result);
    return result.rows[0]; 
};

const updatePost = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    const { rowCount } = await pool.query (consulta, values);


    if (rowCount === 0) {
        throw { code: "404" }; 
    }

    return {id};
};

const deletePost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id];
    const result = await pool.query(consulta, values);

    if (result.rowCount === 0) {
        throw { code: "404" }; 
    };

    return id;
};

export {allPosts, addPost, updatePost, deletePost};