#!/usr/bin/python

from subprocess import check_call
import argparse

parser = argparse.ArgumentParser(description='Build application')
parser.add_argument('--all',
                    dest='all',
                    action='store_true',
                    help='Build all components')
parser.add_argument('--docs',
                    dest='docs',
                    action='store_true',
                    help='Build documentation')
parser.add_argument('--javascript',
                    dest='js',
                    action='store_true',
                    help='Build JavaScript')
parser.add_argument('--deps',
                    dest='deps',
                    action='store_true',
                    help='Build deps file for development')
args = parser.parse_args()

# check code style
print "-------------------------------------------------------------------------------"
print "Checking code style..."
print "-------------------------------------------------------------------------------"
check_call(['gjslint',
            '--strict',
            'src/*.js'])

if args.all or args.deps:
  # build deps
  print "-------------------------------------------------------------------------------"
  print "Building deps file for development..."
  print "-------------------------------------------------------------------------------"
  check_call(['lib/closure-library/closure/bin/build/depswriter.py',
              '--root_with_prefix=src ../../../../src',
              '--output_file=js/habitat-tracker-deps.js'])
  print "Done."

if args.all or args.js:
  # build JS
  print "-------------------------------------------------------------------------------"
  print "Building JavaScript..."
  print "-------------------------------------------------------------------------------"
  check_call(['lib/closure-library/closure/bin/build/closurebuilder.py',
              '--compiler_jar=lib/closure-compiler/compiler.jar',
              '--compiler_flags=--compilation_level=ADVANCED_OPTIMIZATIONS',
              '--compiler_flags=--generate_exports',
              '--compiler_flags=--warning_level=VERBOSE',
              '--compiler_flags=--jscomp_error=checkTypes',
              '--compiler_flags=--jscomp_error=accessControls',
              '--compiler_flags=--externs=src/externs/google.js',
              '--compiler_flags=--externs=src/externs/google_maps_api_v3_10.js',
              '--namespace=habitat.tracker',
              '--output_mode=compiled',
              '--output_file=js/habitat-tracker.js',
              '--root=lib/closure-library',
              '--root=src'])

if args.all or args.docs:
  # build docs
  print "-------------------------------------------------------------------------------"
  print "Building docs..."
  print "-------------------------------------------------------------------------------"
  check_call(['jsdoc',
              '--template=lib/jsdoc-toolkit/templates/codeview',
              '--directory=docs',
              '-D=title:Habitat Balloon Tracker',
              '-D=noGlobal:true',
              #'-D=index:files',
              '--quiet',
              'src'])