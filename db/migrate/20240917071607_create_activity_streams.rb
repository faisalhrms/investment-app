class CreateActivityStreams < ActiveRecord::Migration[7.1]
  def change
    create_table :activity_streams do |t|
      t.integer "table_id"
      t.integer "user_id"
      t.string "table_name"
      t.string "ip_address"
      t.string "browser_name"
      t.string "action_name"
      t.date "action_date"
      t.datetime "action_datetime"
      t.string "slug"
      t.timestamps
    end
  end
end
