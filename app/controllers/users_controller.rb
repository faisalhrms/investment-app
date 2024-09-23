class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_module_name
  before_action :set_permissions, only: [:index, :create, :update, :destroy]
  skip_before_action :authenticate_user! , only: [:create,:register]
  def index
    @users = User.all
    create_activity("View Users Index Page", "User", 0)
  end

  def users
    per_page = (params[:per_page] || 10).to_i
    page = (params[:page] || 1).to_i
    offset = (page - 1) * per_page
    search_query = params[:search]

    @users = User.includes([:role])
                 .where("full_name LIKE :search OR email LIKE :search", search: "%#{search_query}%")
                 .limit(per_page)
                 .offset(offset)

    total_users = User.where("full_name LIKE :search OR email LIKE :search", search: "%#{search_query}%").count
    total_pages = (total_users.to_f / per_page).ceil

    render json: {
      users: @users.map { |user|
        {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          user_type: user.user_type,
          role: {
            name: user.role&.name || "Not Assigned"
          },
          is_active: user.is_active,
          role_id: user.role_id,
          avatar_url: user.avatar.url,
          is_logged_in: user.is_logged_in
        }
      },
      total_pages: total_pages
    }
  end




  def create
    user = User.new
    user.full_name = "#{params[:firstName]} #{params[:lastName]}".strip
    user.password = params[:password]
    user.email = params[:email]
    user.user_name = params[:username]
    user.role_id = Role.last.id
    user.is_active = true
    if user.save
      ActivityStream.create_activity_stream("Create #{user.email} New User", "User", user.id,  user , "create")
      render json: { message: "User Created Successfully", success: true }
    else
      error_message = user.errors.full_messages.first || "Something Went Wrong"
      render json: { message: error_message, success: false }
    end
  end

  def update
    params[:is_active] = false if params[:is_active].nil?
    user = User.find(params[:id])

    if user.update(user_params)
      ActivityStream.create_activity_stream("Update #{user.email} Existing User", "User", user.id, @current_user, "edit")
      render json: { message: "User Updated Successfully", success: true }
    else
      error_message = user.errors.full_messages.first || "Something Went Wrong"
      render json: { message: error_message, success: false }
    end
  end

  def update_preference
    current_user.update(target: params[:open_links_in_new_window])
    head :ok
  end

  def destroy
    user = User.find(params[:id])
    if user.present?
      ActivityStream.create_activity_stream("Delete #{user.email} From Users", "User", user.id, @current_user, "delete")
      user.login_histories.update_all(:is_active => false)
      user.activity_streams.delete_all
      ActivityStream.where(:user_id => nil).delete_all
      user.delete
      render json: { message: "User Deleted", success: true }
    end
  end

  def change_password
    user = User.find(params[:id])
    if user.authenticate(params[:old_password]).present?
      if params[:password].length > 7
        user.update(:password => params[:password])
        ActivityStream.create_activity_stream("Update #{user.email} Password", "User", user.id, @current_user, "edit")
        render json: { message: "Password Updated", success: true }
      else
        render json: { message: "Password Length Should Be Greater Than 8", success: false }
      end
    else
      render json: { message: "Kindly Enter Correct Password", success: false }
    end
  end

  def user_profile
    @module_name = "user_profile"
    @activity_streams = current_user.activity_streams.where(:action_date => (Date.today - 1.days)..Date.today)
  end

  private

  def user_params
    params.permit(:full_name, :email, :password, :avatar, :is_active, :user_type, :role_id)
  end
  def valid_password?(password)
    password.match?(/\A(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d]).{8,}\z/)
  end
  def set_module_name
    @module_name = "Authentication"
    @sub_module_name = "users"
  end
end
