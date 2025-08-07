import { sequelize } from '../models/index'

const DbConnect = async () => {
    sequelize.sync({})
        .then(() => {
            console.log(`Database Connected Successfully ...!!!`);
        })
        .catch((ex) => {
            console.log(`Error While Connecting Database \n ${ex}`)
        })
}

export default DbConnect