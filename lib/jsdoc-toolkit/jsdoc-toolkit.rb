require 'formula'

class JsdocToolkit < Formula
  homepage 'http://code.google.com/p/jsdoc-toolkit/'
  url 'http://jsdoc-toolkit.googlecode.com/svn/trunk', :using => :svn
  version "2.4-svn"

  def install
    system "/bin/echo '#!/bin/ksh\nJSDOCDIR=\"#{libexec}/jsdoc-toolkit\"' > jsdoc"
    system "/usr/bin/grep -v \"^echo \\$CMD$\" jsdoc-toolkit/jsdoc >> jsdoc"

    bin.install 'jsdoc'
    libexec.install 'jsdoc-toolkit'
  end
end