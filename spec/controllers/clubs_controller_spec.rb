require 'spec_helper'

describe ClubsController do


  describe 'GET /clubs.json' do

    it 'returns json of all clubs' do
      Club.should_receive(:all_as_json).and_return(double(to_json: 'the_json'))

      get :index, format: :json

      expect(response.content_type).to eq('application/json')
      expect(response.body).to eq('the_json')
    end
  end
end
