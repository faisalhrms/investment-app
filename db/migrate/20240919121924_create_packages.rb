class CreatePackages < ActiveRecord::Migration[7.1]
  def change
    create_table :packages do |t|
      t.string :name
      t.text :description
      t.string :price
      t.string :status

      t.timestamps
    end
  end
end
