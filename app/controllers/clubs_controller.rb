class ClubsController < ApplicationController
  def index
    respond_to do |format|
      format.html do
        @clubs = Club.order(:name)
      end
      format.json do
        render json: Club.all_as_json
      end
    end
  end

  def new
    @club = Club.new
  end

  def edit
    @club = Club.find(params[:id])
  end

  def update
    @club = Club.find(params[:id])
    @club.attributes = club_params

    if @club.save
      redirect_to clubs_path, notice: 'Club was updated'
    else
      render :edit
    end
  end

  def create
    @club = Club.new(club_params)

    if @club.save
      redirect_to clubs_path, notice: 'Yo, club was added'
    else
      render :new
    end
  end

  def destroy
    @club = Club.find(params[:id])
    @club.destroy
    redirect_to clubs_path, notice: 'Byebye club'
  end

  private

  def club_params
    params
      .require(:club)
      .permit(:name, :first_year, :last_year, :description, :address, :latitude, :longitude)
  end
end
