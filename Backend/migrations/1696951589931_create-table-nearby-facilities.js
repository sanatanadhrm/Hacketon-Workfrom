/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('nearby_facilities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    facility_name: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    distance: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    property_id: {
      type: 'VARCHAR(255)',
      notNull: true
    }
  })
  pgm.addConstraint('nearby_facilities', 'fk_nearby_facilities.property_id_property.id', 'FOREIGN KEY(property_id) REFERENCES property(id) ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropTable('nearby_facilities')
}
