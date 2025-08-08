import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import Role from './role';

export interface UserAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    entityName: string;
    entityDescription: string;
    interestRate?: number;
    creditLimit?: number;
    termCap?: number;
    subscriptionId?: number;
    roleId?: number;
};

/*
  We have to declare the UserCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> { }

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}


// ... instances code

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: 'first_name',
    },
    lastName: {
      allowNull: false,
      type: DataTypes.TEXT,
      field: 'last_name',
    },
    email: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: 'email',
      unique: true,
    },
    entityName: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'entity_name',
    },
    entityDescription: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'entity_description',
    },
    password: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'password',
    },
    interestRate: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'interest_rate',
    },
    termCap: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'term_cap',
    },
    creditLimit: {
      allowNull: true,
      type: DataTypes.BIGINT,
      field: 'credit_limit',
    },
    subscriptionId:{
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'subscription_id',
    },
    roleId:{
      allowNull: true,
      type: DataTypes.INTEGER,
      field: 'role_id',
    }
  },{
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt:'created_at',
    updatedAt: 'updated_at',
  freezeTableName:true,
  }
);

User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role',
});

Role.hasOne(User, {
  foreignKey: 'roleId',
  as: 'role',
});

export default User