import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import Permission from './permission';
import RolePermission from './rolePermission';

export interface RoleAttributes {
  id?: number;
  roleName: string;
  roleDescription: string;
};

/*
  We have to declare the RoleCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
export interface RoleCreationAttributes
  extends Optional<RoleAttributes, 'id'> { }

export interface RoleInstance
  extends Model<RoleAttributes, RoleCreationAttributes>,
  RoleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}


// ... instances code

const Role = sequelize.define<RoleInstance>(
  'Role',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    roleName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'role_name',
    },
    roleDescription: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'role_description',
    },
  }, {
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName:true,
}
);

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'roleId',
  otherKey: 'permissionId',
  as: 'permissions',
});

export default Role