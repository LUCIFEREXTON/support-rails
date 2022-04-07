Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'ticket/init_settings' => 'ticket#init_settings'
      get 'ticket/index/:per_page/:page_no' => 'ticket#index'
      post 'ticket/read' => 'ticket#read'
      get 'ticket/create' => 'ticket#new'
      post 'ticket/create' => 'ticket#create'
      put 'ticket/update/:id' => 'ticket#update'
      post 'ticket/reply/:id' => 'ticket#reply'
			get 'ticket/blog_uri_list' => 'ticket#blog_uri_list'
    end
  end

  ticket_route = '/ticket/faq'

  get ticket_route, to:'homepage#index'
  get "#{ticket_route}/*other", to:'homepage#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
