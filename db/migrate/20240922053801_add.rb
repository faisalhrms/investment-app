class Add < ActiveRecord::Migration[7.1]
  def change
    add_column :plan_transactions, :status, :string, :default => "pending"
    add_column :plan_transactions, :deposit_amount, :string
  end
end
