# deploy.rb

# config valid for current version and patch releases of Capistrano
lock "~> 3.19.1"

set :application, 'investment-app'
set :deploy_user, 'alche'
set :assets_roles, [:app]

# Setup repo details
set :repo_url, 'git@github.com:faisalhrms/investment-app.git'

set :rbenv_path, "/home/#{fetch(:deploy_user)}/.rbenv"
set :rbenv_type, :user
set :rbenv_ruby, '3.2.2'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }

set :bundle_flags, '--deployment'
set :bundle_binstubs, nil

# How many old releases do we want to keep
set :keep_releases, 5

set :pty, true
set :ssh_options, { forward_agent: true, user: :alche }
set :use_sudo, false

set :deploy_port, 80

# Files we want symlinking to specific entries in shared
set :linked_files, %w{config/database.yml config/local_env.yml}

# Dirs we want symlinking to shared
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/pdf public/excel public/img}

# What specs should be run before deployment is allowed to continue
set :tests, []

# Which config files should be copied by deploy:setup_config
set(:config_files, %w(
  nginx.conf
  database.example.yml
  local_env.example.yml
  log_rotation
  unicorn.rb
  unicorn_init.sh
))

# Which config files should be made executable after copying by deploy:setup_config
set(:executable_config_files, %w(
  unicorn_init.sh
))

# Files which need to be symlinked to other parts of the filesystem
set(:symlinks, [
  {
    source: "nginx.conf",
    link: "/etc/nginx/sites-enabled/{{full_app_name}}"
  },
  {
    source: "unicorn_init.sh",
    link: "/etc/init.d/unicorn_{{full_app_name}}"
  },
  {
    source: "log_rotation",
    link: "/etc/logrotate.d/{{full_app_name}}"
  }
])

namespace :deploy do
  # Make sure we're deploying what we think we're deploying
  before :deploy, "deploy:check_revision"
  # Only allow a deploy with passing tests to be deployed
  before :deploy, "deploy:run_tests"
  # Ensure npm installs dependencies only if package.json has changed
  before 'deploy:assets:precompile', 'deploy:conditionally_npm_install'
  # Compile Webpack assets
  before 'deploy:assets:precompile', 'deploy:webpack_compile'
  # Cleanup after finishing
  after :finishing, 'deploy:cleanup'

  # Remove the default nginx configuration as it will tend to conflict with our configs
  before 'deploy:setup_config', 'nginx:remove_default_vhost'

  # Reload nginx so it will pick up any modified vhosts from setup_config
  after 'deploy:setup_config', 'nginx:restart'

  # As of Capistrano 3.1, the `deploy:restart` task is not called automatically
  after 'deploy:publishing', 'deploy:restart', 'delayed_job:restart'

  task :conditionally_npm_install do
    on roles(:web) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          if test("[[ $(diff -qr node_modules/ .node_modules_cache/ || echo 'changed') == 'changed' ]]")
            execute :npm, 'install'
            execute :cp, '-r node_modules/. .node_modules_cache/'
          end
        end
      end
    end
  end

  task :webpack_compile do
    on roles(:web) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, 'webpacker:compile'
        end
      end
    end
  end
end
