/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('amenities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    amenities_name: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    property_id: {
      type: 'VARCHAR(255)',
      notNull: true
    }
  })
  pgm.addConstraint('amenities', 'fk_amenities.property_id_property.id', 'FOREIGN KEY(property_id) REFERENCES property(id) ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropTable('amenities')
}
