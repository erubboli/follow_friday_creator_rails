class SessionsController < ApplicationController
  def create
    session[:access_token] = request.env['omniauth.auth']['credentials']['token']
    session[:access_token_secret] = request.env['omniauth.auth']['credentials']['secret']
    redirect_to show_path, notice: 'Signed in'
  end

  def show

    if session['access_token'] && session['access_token_secret']

      @user = client.user()
      friendsId = client.friend_ids().to_a
      @friends = Array.new

      friendsId.each_slice(100) do |slice|

        @friends << client.users(slice)

      end

      @friendsDetail = Array.new

      @friends.each do |friend|

        @friendsDetail.concat(friend)

      end

    else

      redirect_to failure_path

    end

  end

  def error
    flash[:error] = 'Sign in with Twitter failed'
    redirect_to root_path
  end

  def destroy
    reset_session
    redirect_to root_path, notice: 'Signed out'
  end
end

