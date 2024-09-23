class User < ApplicationRecord
  has_attached_file :avatar,
                    url: "#{ENV['APP_URL']}/system/:class/:attachment/:id/:style/:filename",
                    path: ":rails_root/public/system/:class/:attachment/:id/:style/:filename",
                    default_url: "#{ENV['APP_URL']}/system/profile-placeholder.jpg"

  validates_attachment :avatar, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }, if: :avatar_attached?

  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :full_name, presence: true
  validates :user_type, presence: true
  has_many :login_histories
  has_many :activity_streams
  belongs_to :role
  has_many :plan_transactions

  def self.current
    Thread.current[:current_user]
  end

  def self.current=(usr)
    Thread.current[:current_user] = usr
  end

  private
  def avatar_url
    avatar&.url || "#{ENV['APP_URL']}/system/profile-placeholder.jpg"
  end
  def avatar_attached?
    avatar.present?
  end
end
