Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # config/routes.rb
  root to: "home#index" # This will render the index.html file that React uses

  # Catch-all route for React Router


  post 'create' => 'sessions#create'
  post 'reset_user_password' => 'sessions#reset_user_password'
  get 'logout' => 'sessions#destroy'
  get 'login' => 'sessions#login'
  get 'recover' => 'sessions#recover'
  post 'send_recover' => 'sessions#send_recover_email'
  post 'set_password' => 'sessions#set_password'
  get 'change_password' => 'sessions#change_password'
  get 'reset_password' => 'sessions#reset_password'

  ##### USERS #####
  get 'user' => 'users#index'
  get 'users' => 'users#users'
  get 'register' => 'users#register'
  post 'new_user' => 'users#create'
  post 'update_user/:id' => 'users#update'
  post 'delete_user/:id' => 'users#destroy'
  post 'change_password_user' => 'users#change_password'
  get 'user_profile' => 'users#user_profile'
  post '/update_preference', to: 'users#update_preference'

  ##### MENUS #####
  get 'menu' => 'menus#index'
  get 'menus' => 'menus#menus'
  post 'new_menu' => 'menus#create'
  post 'update_menu/:id/' => 'menus#update'
  post 'delete_menu' => 'menus#destroy'
  get 'menus/:id/edit_modal', to: 'menus#edit_modal', as: 'edit_modal_menu'

  ##### ROLE/PERMISSIONS #####
  get 'role' => 'roles#index'
  get 'roles' => 'roles#roles'
  post 'new_role' => 'roles#create'
  put 'update_role', to: 'roles#update'
  post 'delete_role' => 'roles#destroy'
  get 'roles/:id/edit', to: 'roles#edit'

  ##### Dashboard #####
  get 'dashboard' => 'dashboards#index'
  get 'approval_request' => 'dashboards#approval_request'
  get 'cart' => 'home#cart'
  post 'checkout' => 'home#checkout'
  get 'checkout_page' => 'home#checkout_page'

  ##### packages #####
  resources :packages, only: [:index, :show, :create, :update, :destroy] do
    collection do
      get 'list', to: 'packages#list', defaults: { format: :json }
      get 'active_plan', to: 'packages#active_plan', defaults: { format: :json }
      get 'pending_requests', to: 'packages#pending_requests', defaults: { format: :json }
    end
    member do
      delete 'cancel_plan', to: 'packages#cancel_plan'
      put 'approve', to: 'packages#approve'
      put 'reject', to: 'packages#reject'
    end
  end

  ##### ACTIVITY STREAMS #####
  get 'activity_stream' => 'activity_streams#index'
  get 'activity_streams', to: 'activity_streams#activity_streams', defaults: { format: 'json' }
  post 'filter_activity_stream' => 'activity_streams#show'
  # Defines the root path route ("/")
  # root "posts#index"
end
