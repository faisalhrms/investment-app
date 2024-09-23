class CreatePermissions < ActiveRecord::Migration[7.1]
  def change
    create_table :permissions do |t|
      t.boolean "is_index", default: false
      t.boolean "is_create", default: false
      t.boolean "is_view", default: false
      t.boolean "is_edit", default: false
      t.boolean "is_delete", default: false
      t.integer "menu_id"
      t.integer "role_id"
      t.index ["is_create"], name: "index_permissions_on_is_create"
      t.index ["is_delete"], name: "index_permissions_on_is_delete"
      t.index ["is_edit"], name: "index_permissions_on_is_edit"
      t.index ["is_index"], name: "index_permissions_on_is_index"
      t.index ["is_view"], name: "index_permissions_on_is_view"
      t.index ["menu_id"], name: "index_permissions_on_menu_id"
      t.timestamps
    end
  end
end
