/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('property', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    city: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    location: {
      type: 'TEXT',
      notNull: true
    },
    contact: {
      type: 'VARCHAR(13)',
      notNull: true
    },
    description: {
      type: 'TEXT',
      notNull: true
    },
    is_ready: {
      type: 'SMALLINT',
      notNull: true,
      default: 0
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('property')
}
