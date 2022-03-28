Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'ticket/index/:per_page/:page_no' => 'ticket#index'
      post 'ticket/read' => 'ticket#read'
      post 'ticket/create' => 'ticket#create'
      put 'ticket/update/:id' => 'ticket#update'
      post 'ticket/reply/:id' => 'ticket#reply'
			get 'ticket/blog_uri_list' => 'ticket#blog_uri_list'
    end
  end
  root 'homepage#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
