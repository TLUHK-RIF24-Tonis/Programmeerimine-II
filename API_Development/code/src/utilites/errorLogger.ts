import pool from "../database";

const logErrorToDb = async (message: string, stack: string | null, method: string, route: string, userId: number | null) => {
    await pool.query(
        "INSERT INTO error_logs (error_message, stack, error_method, error_route, user_id) VALUES (?, ?, ?, ?, ?)",
        [message, stack, method, route, userId]
        );
};

export default { logErrorToDb };
