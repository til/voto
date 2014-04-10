class Club < ActiveRecord::Base
  validates :name, presence: true
  validates :first_year, presence: true

  geocoded_by :address
  after_validation :geocode

  def self.all_as_json
    AllAsJson.new.as_json
  end

  def open_in?(year)
    year >= first_year && (last_year.nil? || year <= last_year)
  end

  class AllAsJson
    def as_json
      {
        'clubs' => clubs_as_json,
        'years' => years_as_json,
      }
    end

    private

    def clubs_as_json
      clubs.map(&:as_json)
    end

    def years_as_json
      (1990..2014).reduce({}) do |years, year|
        years[year] = []
        clubs.each.with_index { |club, i| years[year] << i if club.open_in?(year) }
        years
      end
    end

    def clubs
      @clubs ||= Club.all
    end
  end
end
