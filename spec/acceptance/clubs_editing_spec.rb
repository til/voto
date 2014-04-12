require 'spec_helper'

feature 'Clubs editing' do

  scenario 'Add a club' do
    visit_new_club_form
    submit_form
    club_was_created
  end

  scenario 'Edit a club'

  scenario 'Delete a club'

  before do
    Geocoder::Lookup::Test.add_stub(
      "Strelitzer Straße, Berlin", [
        {
          'latitude'     => 52.5,
          'longitude'    => 13.5,
        }])
  end

  def visit_new_club_form
    visit clubs_path
    click_link 'New'
  end

  def submit_form
    fill_in 'Name', with: 'Grunli'
    fill_in 'Address', with: 'Strelitzer Straße, Berlin'
    fill_in 'First year', with: '1997'
    click_button 'Create Club'
  end

  def club_was_created
    Club.count.should eq(1)
    Club.first.tap do |club|
      club.name.should eq('Grunli')
      club.latitude.should eq(52.5)
      club.longitude.should eq(13.5)
    end
  end
end
