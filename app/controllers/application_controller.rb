class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  helper_method :current_user, :authenticate_user!
  add_flash_types :success, :danger, :info, :warning
  include RolesHelper
  before_action :set_permissions

  private

  def authenticate_user!
    if current_user.nil?
      redirect_to root_path
      flash[:alert] = "Login somewhere else. Please login again."
    else
      session[:last_active_time] = Time.now.to_i
    end
  end

  def current_user
    return @current_user if defined?(@current_user)
    if session[:user_id].present?
      user = User.find_by(id: session[:user_id])
      if user && ActiveSupport::SecurityUtils.secure_compare(user.authentication_token, session["auth_id"])
        @current_user = user
      end
    end
    @current_user
  end

  def create_activity(action, resource, resource_id)
    ActivityStream.create_activity_stream(action, resource, resource_id, current_user, action.split(' ').first.downcase)
  end

  def set_permissions
    return unless defined?(@sub_module_name) && @sub_module_name.present?

    permissions = fetch_permissions_for_submodule(@sub_module_name, current_user)
    @can_create = permissions[:can_create]
    @can_edit = permissions[:can_edit]
    @can_delete = permissions[:can_delete]
  end
end
