Voto::Application.routes.draw do

  root 'map#index'

  resources :clubs
end
