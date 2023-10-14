/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('admin', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      default: 'admin-123'
    },
    username: {
      type: 'VARCHAR(255)',
      notNull: true,
      default: 'admin@admin.com'
    },
    password: {
      type: 'VARCHAR(255)',
      notNull: true,
      default: 'supersecret'
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('admin')
}
