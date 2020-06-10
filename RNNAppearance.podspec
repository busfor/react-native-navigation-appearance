require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNNAppearance"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']
  s.homepage     = 'https://github.com/busfor/react-native-navigation-appearance'
  s.author       = package['author']
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/busfor/react-native-navigation-appearance.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
end

