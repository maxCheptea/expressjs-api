'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_roles_assoc', {
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'no action',
        onDelete: 'cascade',
      },
      role_id: {
        type: Sequelize.UUID,
        references: {
          model: 'user_roles',
          key: 'id',
        },
        onUpdate: 'no action',
        onDelete: 'cascade',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles_assoc');
  },
};
