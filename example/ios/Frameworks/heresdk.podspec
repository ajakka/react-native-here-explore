Pod::Spec.new do |s|
  s.name         = "heresdk"
  s.version      = "4.18.2.0.105808"
  s.summary      = "Description of HERE SDK"
  s.homepage     = "https://platform.here.com/portal/sdk"
  s.author       = { "HERE Team" => "author@example.com" }
  s.source       = { :http => 'http://example.com/heresdk.zip' }
  s.platform     = :ios
  s.ios.vendored_frameworks = 'heresdk.xcframework'
end
