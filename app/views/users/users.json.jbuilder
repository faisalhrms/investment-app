
json.array! @users do |user|
  json.id user.id
  json.full_name user.full_name
  json.email user.email
  json.user_type user.user_type
  json.role do
    json.name user.role&.name || "Not Assigned"
  end
  json.is_active user.is_active
  json.role_id user.role_id
  json.avatar_url user.avatar.url
  json.is_logged_in user.is_logged_in
end
