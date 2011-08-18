progress_upload_field (for Rails 3.1)
=====================

_progress_upload_field_ provides a FormHelper function to display all necessary divtags and a javascript
for progress-bar display while uploading files. 

Usage
-----

**Gemfile**

Add the following line

    gem 'progress_upload_field', '~> 0.0.1'

**application.js**

Add the following line

    //= require progress_upload_field
    
**application.css**

Add the following line

    @import "progress.css.scss";
    
    
**Use the gem in your view**

Here an example how to use it with HAML. Obviosly it works with html.erm too


      = form_for([@posting,@attachment], :html => { :multipart => true, :name => 'new_attachment' } ) do |f|
        .field
          =f.label :file
          =f.file_field :file, :onchange => "fileSelected('new_attachment','attachment_file','#{posting_attachments_path(@posting)}');"

        .field
          =f.label :submit
          =f.submit t(:submit), :onclick => "uploadFile('new_attachment'); return false;"
          =progress_upload_field('attachment_file')

The keywords are 'new_attachment' and 'attachment_file'. 
You can choose any names you want. 
The name of the form should be provided at `:onclick => "uploadFile('your_forms_name')"`
The name of the model + the name of the upload field should be provided at `progress_upload_field('your_model_your_field')`


Contributing to progress_upload_field
=====================================
 
  * Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
  * Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
  * Fork the project
  * Start a feature/bugfix branch
  * Commit and push until you are happy with your contribution
  * Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
  * Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

Copyright
=========

Copyright (c) 2011 Andi Altendorfer. See LICENSE.txt for further details.
