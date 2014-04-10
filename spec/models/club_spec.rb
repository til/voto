require 'spec_helper'

describe Club do

  describe 'as_json' do
    subject { Club.all_as_json }
    before do
      Club.create!(name: 'WMF',    first_year: 2010, last_year: 2012, latitude: 13.5, longitude: 52.5)
      Club.create!(name: 'GayWMF', first_year: 2012,                  latitude: 13.5, longitude: 52.5)
    end

    it 'has clubs' do
      subject['clubs'].size.should eq(2)
    end

    it 'has years with indexes to clubs' do
      subject['years'][1990].should be_empty
      subject['years'][2010].should eq([0])
      subject['years'][2012].should eq([0, 1])
      subject['years'][2013].should eq([1])
      subject['years'][2014].should eq([1])
    end
  end
end
