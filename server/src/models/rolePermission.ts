import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

export interface RolePermissionAttributes {
    id?: number;
    roleId: number;
    permissionId: number;
};

/*
  We have to declare the RolePermissionCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
export interface RolePermissionCreationAttributes
    extends Optional<RolePermissionAttributes, 'id'> { }

export interface RolePermissionInstance
    extends Model<RolePermissionAttributes, RolePermissionCreationAttributes>,
    RolePermissionAttributes {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}


// ... instances code

const RolePermission = sequelize.define<RolePermissionInstance>(
    'RolePermission',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        roleId: {
            field: 'role_id',
            type: DataTypes.INTEGER,
        },
        permissionId: {
            field: 'permission_id',
            type: DataTypes.INTEGER,
        },
    }, {
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  freezeTableName:true,
}
);


export default RolePermission