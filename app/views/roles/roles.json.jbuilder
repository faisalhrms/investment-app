json.array!(@roles) do |role|
  json.id role.id
  json.is_active role.is_active
  json.name role.name
  json.users_count role.users.size
end
