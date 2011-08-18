require "progress_upload_field/rails"

module ActionView
  module Helpers
    module FormHelper
      def progress_upload_field(div_name)
        fields = ""
        fields += "<div id='progressIndicator'>"
          fields += "<div id='#{div_name}Bar'>"
            fields += "<div id='#{div_name}Response'></div>"
            fields += "<div id='#{div_name}Number'></div>"
          fields += "</div>"
          fields += "<div id='#{div_name}UploadInfo'>"
            fields += "<span id='#{div_name}TransferSpeedInfo'></span>"
            fields += "<span id='#{div_name}TimeRemainingInfo'></span>"
            fields += "<span id='#{div_name}BytesInfo'></span>"
          fields += "</div>"
        fields += "</div>"
        fields += "<div id='#{div_name}Info'></div>"
        fields += "<div id='#{div_name}Name'></div>"
        fields += "<div id='#{div_name}Size'></div>"
        fields += "<div id='#{div_name}Type'></div>"
        raw(fields)
      end
    end
  end
end
