class RolesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_module_name
  before_action :set_permissions, only: [:index, :create, :update, :destroy]

  def index
    @roles = Role.all
    @menus = Menu.includes(:sub_menus).where(menu_type: "main_menu").distinct
    create_activity("View Role/Permissions Index Page", "Role", 0)
  end

  def roles
    @roles = Role.all
    render status:200, template: 'roles/roles'
  end



  def edit
    @role = Role.includes(:permissions).find(params[:id])
    @menus = Menu.all
    render 'roles/edit'
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Role not found' }, status: :not_found
  end

  def show
    if params[:is_active].present?
      params[:is_active] = true
    else
      params[:is_active] = false
    end
    @roles = Role.where(:is_active => params[:is_active])
    if @roles.present?
      ActivityStream.create_activity_stream("Filter Roles/Permissions", "Role", 0, @current_user, "filter")
      flash[:notice] = "Role Found Successfully"
    else
      flash[:alert] = "No Record Found"
    end
    render 'roles/index'
  end

  def create

    role = Role.new(role_params)

    if role.save
      ActivityStream.create_activity_stream("Create #{Role.last.name} New Role/Permissions", "Role", Role.last.id, @current_user, "create")
      flash[:notice] = "Role Created Successfully"
    else
      if role.errors.full_messages.first == "Name has already been taken"
        flash[:alert] = role.errors.full_messages.first
      else
        flash[:alert] = "Something Went Wrong"
      end
    end
    redirect_to role_path
  end

  def update
    role = Role.find(params[:role][:id])
    role_params = params.require(:role).permit(:name, :is_active, permissions: {})
    if role.update(name: role_params[:name], is_active: role_params[:is_active])
      role_params[:permissions].each do |menu_id, permission|
        permission_record = Permission.find_by(role_id: role.id, menu_id: menu_id)
        if permission_record
          permission_record.update(permission.permit(:is_index, :is_create, :is_view, :is_edit, :is_delete))
        else
          Permission.create(role_id: role.id, menu_id: menu_id, **permission.permit(:is_index, :is_create, :is_view, :is_edit, :is_delete))
        end
      end
      ActivityStream.create_activity_stream("Update #{role.name} Existing Role/Permissions", "Role", role.id, @current_user, "edit")
      message = "Role/Permissions Updated Successfully"
      flash[:notice] = message
      render json: { message: message }, status: :ok
    else
      message = "Something Went Wrong"
      flash[:alert] = message
      render json: { message: message }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    message = "Role not found"
    render json: { message: message }, status: :not_found
  rescue => e
    message = "An error occurred: #{e.message}"
    render json: { message: message }, status: :internal_server_error
  end



  def destroy
    role = Role.find(params[:role_id])
    if role.users.present?
      flash[:alert] = "Role Has Currently Assigned To Users"
    else
      ActivityStream.create_activity_stream("Delete #{role.name} From Roles/Permissions", "Role", role.id, @current_user, "delete")
      role.permissions.delete_all
      role.delete
      flash[:notice] = "Role/Permission Deleted"
    end
    redirect_to role_path
  end

  private

  def role_params
    params.require(:role).permit(:name, :is_active)
  end

  def set_module_name
    @module_name = "Authentication"
    @sub_module_name = "roles"
  end

end
