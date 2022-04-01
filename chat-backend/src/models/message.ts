import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

export interface MessageAttributes {
    id?: number;
    senderId: number;
    messageContent: string;
};

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> { }

interface MessageInstance extends Model<MessageAttributes, MessageCreationAttributes>,
MessageAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Message = sequelize.define<MessageInstance>(
    'Message',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        senderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        messageContent: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

Message.sync({ alter: true });

export default Message;