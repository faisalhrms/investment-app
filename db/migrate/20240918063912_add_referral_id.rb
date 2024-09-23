class AddReferralId < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :referral_id, :string
    add_column :users, :user_name, :string
  end
end
