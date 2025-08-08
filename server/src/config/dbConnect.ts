import { sequelize } from '../models/index';
import fs from 'fs';
import path from 'path';

const DbConnect = async () => {
    try {
        await sequelize.sync({});
        console.log(`Database Connected Successfully ...!!!`);

        if(process.env.NODE_ENV === 'development'){
            // Path to your defaultUser.sql
        const sqlPath = path.join(__dirname, '../db/sql/defaultUser.sql');
        
        if (fs.existsSync(sqlPath)) {
            const sql = fs.readFileSync(sqlPath, 'utf8');
            await sequelize.query(sql);
            console.log("✅ Default users ensured in DB");
        } else {
            console.warn("⚠ defaultUser.sql file not found!");
        }
        }

    } catch (ex) {
        console.log(`Error While Connecting Database \n ${ex}`);
    }
};

export default DbConnect;
