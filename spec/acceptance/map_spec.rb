require 'spec_helper'

feature 'Map' do

  # A very basic smoke test to make sure it's not completely broken
  scenario 'on root page' do
    visit root_path
    see_map
  end

  def see_map
    expect(page).to have_selector('#map')
  end
end
