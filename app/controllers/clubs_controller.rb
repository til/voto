class ClubsController < ApplicationController
  def index
    @clubs = Club.order(:name)
  end

  def new
    @club = Club.new
  end

  def edit
    @club = Club.find(params[:id])
  end

  def update
  end

  def create

  end

  private

  def club_params
    params
      .require(:club)
      .permit(:name, :first_year, :last_year, :description, :address, :latitude, :longitude)
  end
end
