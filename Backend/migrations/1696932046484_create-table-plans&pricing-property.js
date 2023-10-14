/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('pricing', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    plans: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    price: {
      type: 'INTEGER',
      notNull: true
    },
    duration: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    property_id: {
      type: 'VARCHAR(255)',
      notNull: true
    }
  })
  pgm.addConstraint('pricing', 'fk_pricing.property_id_property.id', 'FOREIGN KEY(property_id) REFERENCES property(id) ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropTable('pricing')
}
