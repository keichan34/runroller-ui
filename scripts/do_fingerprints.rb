#!/usr/bin/env ruby

require 'digest/sha1'
require 'fileutils'

file_map = {}

dir = File.expand_path("../../public/*.{js,css}", __FILE__)
Dir.glob(dir) do |file|
  next if File.basename(file, ".*") =~ /-[0-9a-f]{40}$/
  digest = Digest::SHA1.hexdigest(File.read(file))
  new_file = File.join(
    File.dirname(file),
    File.basename(file, ".*") + "-" + digest + File.extname(file)
  )
  file_map[File.basename(file)] = File.basename(new_file)
  FileUtils.cp file, new_file
end

index_path = File.expand_path("../../public/index.html", __FILE__)
File.open(index_path, "r+") do |f|
  all = f.read
  file_map.each do |before, after|
    all.gsub!(before, after)
  end
  f.rewind
  f.truncate 0
  f.write all
end
