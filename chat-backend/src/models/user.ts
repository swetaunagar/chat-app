import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';
import Message from './message';

export interface UserAttributes {
    id: number;
    name: string;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
);

User.hasMany(Message, {
    sourceKey: 'id',
    foreignKey: 'senderId',
    as: 'messages'
});

Message.belongsTo(User, {
    foreignKey: 'senderId',
    as: 'user'
});

User.sync({ alter: true });

export default User;