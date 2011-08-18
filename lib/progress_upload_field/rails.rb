module ProgressUploadField
  module Rails
    if ::Rails.version < "3.1"
      require 'progress_upload_field/rails/railtie'
    else
      require 'progress_upload_field/rails/engine'
    end
  end
end