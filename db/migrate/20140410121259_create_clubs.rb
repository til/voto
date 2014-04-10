class CreateClubs < ActiveRecord::Migration
  def change
    create_table :clubs do |t|
      t.string :name, null: false
      t.integer :first_year, null: false
      t.integer :last_year
      t.text :description
      t.text :address
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.timestamps
    end
  end
end
