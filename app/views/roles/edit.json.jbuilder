json.role do
  json.id @role.id
  json.name @role.name
  json.is_active @role.is_active

  json.permissions @role.permissions.map { |permission|
    {
      menu_id: permission.menu_id,
      is_index: permission.is_index,
      is_create: permission.is_create,
      is_view: permission.is_view,
      is_edit: permission.is_edit,
      is_delete: permission.is_delete
    }
  }
end

json.menus @menus.map { |menu|
  {
    id: menu.id,
    name: menu.name,
    main_menu_id: menu.main_menu_id
  }
}
