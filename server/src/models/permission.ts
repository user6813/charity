import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

export interface PermissionAttributes {
  id?: number;
  action: string;
  baseUrl: string;
  method: string;
  path: string;
};

/*
  We have to declare the PermissionCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
export interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, 'id'> { }

export interface PermissionInstance
  extends Model<PermissionAttributes, PermissionCreationAttributes>,
  PermissionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}


// ... instances code

const Permission = sequelize.define<PermissionInstance>(
  'Permission',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    action: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'action',
    },
    baseUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'base_url',
    },
    method: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'method',
    },
    path: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'path',
    }
  }, {
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  freezeTableName:true,
}
);

export default Permission